import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { DocumentService } from '../services/document-service';
import { PersistenceService } from '../services/persistence-service';
import { Document } from '../shared/types';

describe('DocumentService', () => {
  let tempDir: string;
  let persistence: PersistenceService;
  let docService: DocumentService;

  beforeEach(() => {
    tempDir = path.join(os.tmpdir(), `kb-doc-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    persistence = new PersistenceService(tempDir);
    docService = new DocumentService(persistence);
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  function createTempFile(filename: string, content: string): string {
    const filePath = path.join(tempDir, filename);
    fs.writeFileSync(filePath, content);
    return filePath;
  }

  describe('listDocuments', () => {
    it('returns empty array when no documents', () => {
      const docs = docService.listDocuments();
      expect(docs).toEqual([]);
    });
  });

  describe('importDocument', () => {
    it('imports a valid .txt file', () => {
      const filePath = createTempFile('test-doc.txt', 'This is test content for the knowledge base.');

      const doc = docService.importDocument(filePath);

      expect(doc.id).toBeDefined();
      expect(doc.title).toBe('test-doc');
      expect(doc.filename).toBe('test-doc.txt');
      expect(doc.status).toBe('imported');
      expect(doc.size).toBeGreaterThan(0);
      expect(doc.importedAt).toBeDefined();
    });

    it('imports a valid .md file', () => {
      const filePath = createTempFile('notes.md', '# Notes\n\nSome markdown content.');

      const doc = docService.importDocument(filePath);

      expect(doc.title).toBe('notes');
      expect(doc.filename).toBe('notes.md');
      expect(doc.status).toBe('imported');
    });

    it('throws on non-existent file', () => {
      expect(() => docService.importDocument('/nonexistent/path/file.txt'))
        .toThrow('File not found');
    });

    it('throws on file exceeding 10MB limit', () => {
      const filePath = path.join(tempDir, 'large.txt');
      // Create a file larger than 10MB
      const largeBuffer = Buffer.alloc(11 * 1024 * 1024, 'x');
      fs.writeFileSync(filePath, largeBuffer);

      expect(() => docService.importDocument(filePath))
        .toThrow('Maximum size is 10 MB');
    });

    it('stores content for indexing', () => {
      const filePath = createTempFile('content-test.txt', 'Store this content.');

      const doc = docService.importDocument(filePath);
      const content = docService.getDocumentContent(doc.id);

      expect(content).toBe('Store this content.');
    });

    it('updates document count in metadata', () => {
      const file1 = createTempFile('doc1.txt', 'First document.');
      const file2 = createTempFile('doc2.txt', 'Second document.');

      docService.importDocument(file1);
      docService.importDocument(file2);

      const docs = docService.listDocuments();
      expect(docs.length).toBe(2);
    });

    it('sets status to imported (not indexed)', () => {
      const filePath = createTempFile('fresh.txt', 'Fresh content.');
      const doc = docService.importDocument(filePath);
      expect(doc.status).toBe('imported');
    });
  });

  describe('getDocument', () => {
    it('returns document by ID', () => {
      const filePath = createTempFile('get-test.txt', 'Content');
      const imported = docService.importDocument(filePath);

      const retrieved = docService.getDocument(imported.id);
      expect(retrieved).not.toBeNull();
      expect(retrieved!.id).toBe(imported.id);
      expect(retrieved!.title).toBe('get-test');
    });

    it('returns null for non-existent ID', () => {
      const result = docService.getDocument('non-existent-id');
      expect(result).toBeNull();
    });
  });

  describe('updateDocument', () => {
    it('updates document metadata fields', () => {
      const filePath = createTempFile('update-test.txt', 'Update me.');
      const doc = docService.importDocument(filePath);

      const updated = docService.updateDocument(doc.id, { status: 'indexed', chunks: 3 });
      expect(updated).not.toBeNull();
      expect(updated!.status).toBe('indexed');
      expect(updated!.chunks).toBe(3);
    });

    it('returns null for non-existent document', () => {
      const result = docService.updateDocument('bad-id', { status: 'indexed' });
      expect(result).toBeNull();
    });
  });

  describe('deleteDocument', () => {
    it('deletes a document by ID', () => {
      const filePath = createTempFile('delete-me.txt', 'Will be deleted.');
      const doc = docService.importDocument(filePath);

      const result = docService.deleteDocument(doc.id);
      expect(result).toBe(true);
      expect(docService.getDocument(doc.id)).toBeNull();
    });

    it('returns false for non-existent document', () => {
      const result = docService.deleteDocument('ghost-id');
      expect(result).toBe(false);
    });

    it('reduces document count after deletion', () => {
      const file1 = createTempFile('keep.txt', 'Keep me.');
      const file2 = createTempFile('remove.txt', 'Remove me.');

      docService.importDocument(file1);
      const doc2 = docService.importDocument(file2);
      expect(docService.listDocuments().length).toBe(2);

      docService.deleteDocument(doc2.id);
      expect(docService.listDocuments().length).toBe(1);
    });
  });

  describe('hasPersistedData', () => {
    it('returns false when no data', () => {
      expect(docService.hasPersistedData()).toBe(false);
    });

    it('returns true after importing a document', () => {
      const filePath = createTempFile('persist-test.txt', 'Data.');
      docService.importDocument(filePath);
      expect(docService.hasPersistedData()).toBe(true);
    });
  });
});
