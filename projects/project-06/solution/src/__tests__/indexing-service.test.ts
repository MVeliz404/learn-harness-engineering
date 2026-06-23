import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { IndexingService } from '../services/indexing-service';
import { PersistenceService } from '../services/persistence-service';
import { DocumentService } from '../services/document-service';
import { Document } from '../shared/types';

describe('IndexingService', () => {
  let tempDir: string;
  let persistence: PersistenceService;
  let docService: DocumentService;
  let indexingService: IndexingService;

  beforeEach(() => {
    tempDir = path.join(os.tmpdir(), `kb-idx-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    persistence = new PersistenceService(tempDir);
    docService = new DocumentService(persistence);
    indexingService = new IndexingService(persistence);
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  function importDoc(filename: string, content: string): Document {
    const filePath = path.join(tempDir, filename);
    fs.writeFileSync(filePath, content);
    return docService.importDocument(filePath);
  }

  describe('getStatus', () => {
    it('returns idle status when no documents', () => {
      const status = indexingService.getStatus();
      expect(status.indexStatus).toBe('idle');
      expect(status.documentsLoaded).toBe(0);
      expect(status.currentIndexed).toBe(0);
    });

    it('returns idle status when documents exist but none indexed', () => {
      importDoc('doc.txt', 'Some content.');
      const status = indexingService.getStatus();
      expect(status.indexStatus).toBe('idle');
      expect(status.documentsLoaded).toBe(1);
      expect(status.currentIndexed).toBe(0);
    });

    it('returns ready status when all documents indexed', async () => {
      importDoc('doc.txt', 'This is a test document with enough content to index properly and create at least one chunk.');
      await indexingService.startIndexing();

      const status = indexingService.getStatus();
      expect(status.indexStatus).toBe('ready');
      expect(status.documentsLoaded).toBe(1);
      expect(status.currentIndexed).toBe(1);
    });
  });

  describe('chunkDocument', () => {
    it('creates chunks with correct structure', async () => {
      const doc = importDoc('test.txt', 'This is a single paragraph of content for testing chunking.');
      await indexingService.startIndexing(doc.id);

      const chunks = indexingService.getChunksForDocument(doc.id);
      expect(chunks.length).toBeGreaterThan(0);

      const chunk = chunks[0];
      expect(chunk.id).toBeDefined();
      expect(chunk.documentId).toBe(doc.id);
      expect(chunk.index).toBe(0);
      expect(chunk.content).toBeDefined();
      expect(chunk.metadata.charCount).toBeDefined();
      expect(chunk.metadata.wordCount).toBeDefined();
    });

    it('splits at paragraph boundaries', async () => {
      const paragraphs = Array.from({ length: 10 }, (_, i) =>
        `Paragraph ${i + 1}: `.padEnd(100, 'x')
      ).join('\n\n');

      const doc = importDoc('multi-para.txt', paragraphs);
      await indexingService.startIndexing(doc.id);

      const chunks = indexingService.getChunksForDocument(doc.id);
      expect(chunks.length).toBeGreaterThan(1); // Should produce multiple chunks
    });

    it('handles single short paragraph', async () => {
      const doc = importDoc('short.txt', 'Short text.');
      await indexingService.startIndexing(doc.id);

      const chunks = indexingService.getChunksForDocument(doc.id);
      expect(chunks.length).toBe(1);
    });

    it('sets correct metadata on chunks', async () => {
      const content = 'Hello world here is some test content.';
      const doc = importDoc('meta-test.txt', content);
      await indexingService.startIndexing(doc.id);

      const chunks = indexingService.getChunksForDocument(doc.id);
      expect(chunks.length).toBe(1);
      expect(chunks[0].metadata.charCount).toBe(String(content.length));
      expect(Number(chunks[0].metadata.wordCount)).toBeGreaterThan(0);
    });
  });

  describe('startIndexing', () => {
    it('indexes a single document', async () => {
      const doc = importDoc('single.txt', 'Single document content for indexing.');
      await indexingService.startIndexing(doc.id);

      const chunks = indexingService.getChunksForDocument(doc.id);
      expect(chunks.length).toBeGreaterThan(0);
    });

    it('updates document status to indexed after indexing', async () => {
      const doc = importDoc('status-test.txt', 'Content to index.');
      await indexingService.startIndexing(doc.id);

      const updated = docService.getDocument(doc.id);
      expect(updated!.status).toBe('indexed');
      expect(updated!.chunks).toBeGreaterThan(0);
    });

    it('returns error status when document content not found', async () => {
      const status = await indexingService.startIndexing('non-existent-id');
      expect(status.indexStatus).toBe('error');
    });

    it('indexes all documents in batch mode', async () => {
      importDoc('batch1.txt', 'First document with enough content to make at least one paragraph for chunking purposes.');
      importDoc('batch2.txt', 'Second document also with sufficient text content for the indexing pipeline to process.');

      const status = await indexingService.startIndexing();
      expect(status.indexStatus).toBe('ready');
      expect(status.currentIndexed).toBe(2);
    });

    it('skips already indexed documents', async () => {
      importDoc('skip1.txt', 'Document one with content for indexing pipeline testing.');
      importDoc('skip2.txt', 'Document two also with text for the indexing process.');

      await indexingService.startIndexing();
      // Index again - should skip both
      const status = await indexingService.startIndexing();
      expect(status.currentIndexed).toBe(2);
    });
  });

  describe('getAllChunks', () => {
    it('retrieves all chunks across all documents', async () => {
      importDoc('all1.txt', 'First document content for batch chunk retrieval testing in the indexing system.');
      importDoc('all2.txt', 'Second document also with content for chunk retrieval across multiple documents.');

      await indexingService.startIndexing();
      const allChunks = indexingService.getAllChunks();
      expect(allChunks.length).toBeGreaterThan(1);

      // Each chunk should have a valid documentId
      for (const chunk of allChunks) {
        expect(chunk.documentId).toBeDefined();
        expect(chunk.content).toBeDefined();
      }
    });

    it('returns empty array when nothing indexed', () => {
      const chunks = indexingService.getAllChunks();
      expect(chunks).toEqual([]);
    });
  });

  describe('getChunksForDocument', () => {
    it('returns empty array for non-indexed document', () => {
      const doc = importDoc('no-index.txt', 'Not indexed yet.');
      const chunks = indexingService.getChunksForDocument(doc.id);
      expect(chunks).toEqual([]);
    });

    it('returns chunks for indexed document', async () => {
      const doc = importDoc('indexed.txt', 'This document will be indexed to produce chunks for retrieval testing.');
      await indexingService.startIndexing(doc.id);

      const chunks = indexingService.getChunksForDocument(doc.id);
      expect(chunks.length).toBeGreaterThan(0);
      expect(chunks[0].documentId).toBe(doc.id);
    });
  });
});
