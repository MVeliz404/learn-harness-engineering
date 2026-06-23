import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { QaService } from '../services/qa-service';
import { PersistenceService } from '../services/persistence-service';
import { IndexingService } from '../services/indexing-service';
import { DocumentService } from '../services/document-service';
import { Document } from '../shared/types';

describe('QaService', () => {
  let tempDir: string;
  let persistence: PersistenceService;
  let docService: DocumentService;
  let indexingService: IndexingService;
  let qaService: QaService;

  beforeEach(() => {
    tempDir = path.join(os.tmpdir(), `kb-qa-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    persistence = new PersistenceService(tempDir);
    docService = new DocumentService(persistence);
    indexingService = new IndexingService(persistence);
    qaService = new QaService(persistence, indexingService);
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  function importAndIndex(filename: string, content: string): Document {
    const filePath = path.join(tempDir, filename);
    fs.writeFileSync(filePath, content);
    const doc = docService.importDocument(filePath);
    return doc;
  }

  describe('ask', () => {
    it('returns a response with timestamp', async () => {
      const response = await qaService.ask('What is the architecture?');
      expect(response.timestamp).toBeDefined();
      expect(new Date(response.timestamp).toISOString()).toBe(response.timestamp);
    });

    it('returns answer string', async () => {
      const response = await qaService.ask('What is the design?');
      expect(response.answer).toBeDefined();
      expect(response.answer.length).toBeGreaterThan(0);
    });

    it('returns low confidence (0.3) when no documents indexed', async () => {
      const response = await qaService.ask('What is the architecture?');
      expect(response.confidence).toBe(0.3);
      expect(response.citations).toEqual([]);
    });

    it('returns high confidence (0.85) with citations when documents indexed', async () => {
      const doc = importAndIndex(
        'architecture.md',
        'The system uses a layered architecture pattern with clear boundaries between components. ' +
        'Design patterns ensure maintainability and scalability of the knowledge base application. ' +
        'The architecture includes a renderer layer, preload scripts, main process, and services layer.'
      );
      await indexingService.startIndexing(doc.id);

      const response = await qaService.ask('What is the architecture and design?');
      expect(response.confidence).toBe(0.85);
      expect(response.citations.length).toBeGreaterThan(0);
    });

    it('matches mock patterns for known keywords', async () => {
      const doc = importAndIndex(
        'indexing.md',
        'The indexing pipeline splits documents into chunks of approximately 500 characters. ' +
        'Each chunk is stored with metadata including character count and word count. ' +
        'The indexing process enables fast search and retrieval of relevant document sections.'
      );
      await indexingService.startIndexing(doc.id);

      const response = await qaService.ask('How does indexing work?');
      expect(response.answer).toContain('indexing');
      expect(response.citations.length).toBeGreaterThan(0);
    });

    it('matches feedback-related keywords', async () => {
      const doc = importAndIndex(
        'feedback.md',
        'Users can provide positive or negative feedback on Q&A responses. ' +
        'Feedback is stored alongside the question and answer for quality improvement. ' +
        'The feedback system helps track answer quality over time.'
      );
      await indexingService.startIndexing(doc.id);

      const response = await qaService.ask('How does feedback work?');
      expect(response.answer).toContain('feedback');
    });

    it('matches meeting-related keywords', async () => {
      const doc = importAndIndex(
        'meeting.md',
        'The team discussed implementing a retrieval-augmented generation pipeline. ' +
        'Key decisions included using local chunk storage and citation-based verification. ' +
        'Meeting notes summary includes architecture decisions and next steps.'
      );
      await indexingService.startIndexing(doc.id);

      const response = await qaService.ask('What was in the meeting summary?');
      expect(response.answer).toContain('retrieval');
    });

    it('matches retrieval-related keywords', async () => {
      const doc = importAndIndex(
        'retrieval.md',
        'Retrieval works by matching query keywords against indexed chunks. ' +
        'The system ranks chunks by keyword overlap and returns the most relevant excerpts. ' +
        'This retrieval method enables citation-based grounded question answering.'
      );
      await indexingService.startIndexing(doc.id);

      const response = await qaService.ask('How does retrieval work?');
      expect(response.answer).toContain('Retrieval');
    });

    it('returns fallback answer when no keywords match', async () => {
      const doc = importAndIndex(
        'generic.md',
        'The knowledge base application manages personal documents with import, indexing, and QA features. ' +
        'It provides a desktop interface for organizing and searching through text content.'
      );
      await indexingService.startIndexing(doc.id);

      const response = await qaService.ask('xyzzy nonsense question that does not match any pattern');
      expect(response.answer).toBeDefined();
      expect(response.answer.length).toBeGreaterThan(0);
    });

    it('returns fallback when no documents are indexed', async () => {
      const response = await qaService.ask('Any question here?');
      expect(response.answer).toContain('No relevant documents');
    });
  });

  describe('history', () => {
    it('starts with empty history', () => {
      const history = qaService.getHistory();
      expect(history).toEqual([]);
    });

    it('records Q&A in history', async () => {
      await qaService.ask('Question one?');
      const history = qaService.getHistory();
      expect(history.length).toBe(1);
      expect(history[0].question).toBe('Question one?');
      expect(history[0].response).toBeDefined();
      expect(history[0].response.answer).toBeDefined();
    });

    it('accumulates multiple Q&A entries', async () => {
      await qaService.ask('First question?');
      await qaService.ask('Second question?');
      await qaService.ask('Third question?');

      const history = qaService.getHistory();
      expect(history.length).toBe(3);
    });

    it('persists history across service instances', async () => {
      await qaService.ask('Persisted question?');

      // Create a new QaService with the same persistence
      const newQaService = new QaService(persistence, indexingService);
      const history = newQaService.getHistory();
      expect(history.length).toBe(1);
      expect(history[0].question).toBe('Persisted question?');
    });
  });

  describe('clearHistory', () => {
    it('clears all Q&A history', async () => {
      await qaService.ask('Q1?');
      await qaService.ask('Q2?');
      expect(qaService.getHistory().length).toBe(2);

      qaService.clearHistory();
      expect(qaService.getHistory()).toEqual([]);
    });
  });

  describe('feedback', () => {
    it('submits positive feedback', () => {
      const entry = qaService.submitFeedback(
        new Date().toISOString(),
        'Test question?',
        'positive',
        'Great answer!'
      );

      expect(entry.id).toBeDefined();
      expect(entry.rating).toBe('positive');
      expect(entry.question).toBe('Test question?');
      expect(entry.comment).toBe('Great answer!');
      expect(entry.submittedAt).toBeDefined();
    });

    it('submits negative feedback', () => {
      const entry = qaService.submitFeedback(
        new Date().toISOString(),
        'Bad question?',
        'negative'
      );

      expect(entry.rating).toBe('negative');
      expect(entry.comment).toBe('');
    });

    it('retrieves all feedback entries', () => {
      qaService.submitFeedback('2026-01-01T00:00:00.000Z', 'Q1?', 'positive');
      qaService.submitFeedback('2026-01-02T00:00:00.000Z', 'Q2?', 'negative');

      const feedback = qaService.getFeedback();
      expect(feedback.length).toBe(2);
      expect(feedback[0].rating).toBe('positive');
      expect(feedback[1].rating).toBe('negative');
    });

    it('persists feedback across instances', () => {
      qaService.submitFeedback('2026-01-01T00:00:00.000Z', 'Q?', 'positive');

      const newQaService = new QaService(persistence, indexingService);
      const feedback = newQaService.getFeedback();
      expect(feedback.length).toBe(1);
      expect(feedback[0].question).toBe('Q?');
    });
  });

  describe('citation scores', () => {
    it('scores chunks by keyword overlap', async () => {
      const doc = importAndIndex(
        'scoring.md',
        'Architecture design patterns are important for building scalable systems. ' +
        'The design of the knowledge base uses a layered architecture approach. ' +
        'Pattern matching and retrieval are key components of the design architecture.'
      );
      await indexingService.startIndexing(doc.id);

      const response = await qaService.ask('architecture design pattern');
      // Should have citations since keywords match
      expect(response.citations.length).toBeGreaterThan(0);
    });

    it('returns top 2 citations max', async () => {
      const doc = importAndIndex(
        'top-citations.md',
        'Architecture design one. Architecture design two. Architecture design three. ' +
        'Architecture design four. Architecture design five. Architecture design six. ' +
        'The architecture patterns guide the design of all system components and modules.'
      );
      await indexingService.startIndexing(doc.id);

      const response = await qaService.ask('architecture design');
      expect(response.citations.length).toBeLessThanOrEqual(2);
    });
  });
});
