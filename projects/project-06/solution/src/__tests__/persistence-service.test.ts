import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { PersistenceService } from '../services/persistence-service';

describe('PersistenceService', () => {
  let tempDir: string;
  let persistence: PersistenceService;

  beforeEach(() => {
    tempDir = path.join(os.tmpdir(), `kb-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    persistence = new PersistenceService(tempDir);
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('creates data, documents, and index directories on construction', () => {
    expect(fs.existsSync(tempDir)).toBe(true);
    expect(fs.existsSync(path.join(tempDir, 'documents'))).toBe(true);
    expect(fs.existsSync(path.join(tempDir, 'index'))).toBe(true);
  });

  describe('JSON read/write', () => {
    it('writes and reads JSON data', () => {
      const data = { name: 'test', items: [1, 2, 3] };
      persistence.writeJson('test.json', data);

      const result = persistence.readJson<typeof data>('test.json');
      expect(result).toEqual(data);
    });

    it('returns null when reading non-existent JSON file', () => {
      const result = persistence.readJson('nonexistent.json');
      expect(result).toBeNull();
    });

    it('writes JSON atomically with proper formatting', () => {
      persistence.writeJson('data.json', { key: 'value' });
      const raw = fs.readFileSync(path.join(tempDir, 'data.json'), 'utf-8');
      const parsed = JSON.parse(raw);
      expect(parsed).toEqual({ key: 'value' });
      // Should be pretty-printed with 2 spaces
      expect(raw).toContain('\n  ');
    });
  });

  describe('Text read/write', () => {
    it('writes and reads text content', () => {
      persistence.writeText('notes.txt', 'Hello World');
      const result = persistence.readText('notes.txt');
      expect(result).toBe('Hello World');
    });

    it('returns null for non-existent text file', () => {
      const result = persistence.readText('missing.txt');
      expect(result).toBeNull();
    });

    it('writes to nested directories', () => {
      persistence.writeText('deep/nested/file.txt', 'content');
      expect(fs.existsSync(path.join(tempDir, 'deep', 'nested', 'file.txt'))).toBe(true);
      const result = persistence.readText('deep/nested/file.txt');
      expect(result).toBe('content');
    });
  });

  describe('File operations', () => {
    it('copies files to documents directory', () => {
      const srcFile = path.join(tempDir, 'source.txt');
      fs.writeFileSync(srcFile, 'source content');

      persistence.copyFileToDocuments(srcFile, 'dest.txt');
      const destPath = path.join(tempDir, 'documents', 'dest.txt');
      expect(fs.existsSync(destPath)).toBe(true);
      expect(fs.readFileSync(destPath, 'utf-8')).toBe('source content');
    });

    it('deletes files from documents directory', () => {
      const filePath = path.join(tempDir, 'documents', 'to-delete.txt');
      fs.writeFileSync(filePath, 'delete me');

      persistence.deleteFromDocuments('to-delete.txt');
      expect(fs.existsSync(filePath)).toBe(false);
    });

    it('handles delete of non-existent file gracefully', () => {
      // Should not throw
      expect(() => persistence.deleteFromDocuments('ghost.txt')).not.toThrow();
    });

    it('lists files in a directory', () => {
      persistence.writeText('subdir/a.txt', 'a');
      persistence.writeText('subdir/b.txt', 'b');

      const files = persistence.listFiles('subdir');
      expect(files).toContain('a.txt');
      expect(files).toContain('b.txt');
      expect(files.length).toBe(2);
    });

    it('returns empty array for non-existent directory', () => {
      const files = persistence.listFiles('nonexistent-dir');
      expect(files).toEqual([]);
    });
  });

  describe('exists check', () => {
    it('returns true for existing file', () => {
      persistence.writeText('exists.txt', 'yes');
      expect(persistence.exists('exists.txt')).toBe(true);
    });

    it('returns false for non-existent file', () => {
      expect(persistence.exists('nope.txt')).toBe(false);
    });
  });

  describe('resetAll', () => {
    it('removes all data and recreates directories', () => {
      persistence.writeJson('data.json', { test: true });
      persistence.writeText('content/doc.txt', 'document');
      expect(persistence.exists('data.json')).toBe(true);

      persistence.resetAll();

      expect(persistence.exists('data.json')).toBe(false);
      expect(fs.existsSync(tempDir)).toBe(true);
      expect(fs.existsSync(path.join(tempDir, 'documents'))).toBe(true);
    });

    it('resetAll works on clean state (idempotent)', () => {
      // Should not throw when called twice
      persistence.resetAll();
      expect(() => persistence.resetAll()).not.toThrow();
    });
  });

  describe('path getters', () => {
    it('getDataDir returns the data directory', () => {
      expect(persistence.getDataDir()).toBe(tempDir);
    });

    it('getDocumentsDir returns the documents directory', () => {
      expect(persistence.getDocumentsDir()).toBe(path.join(tempDir, 'documents'));
    });

    it('getIndexDir returns the index directory', () => {
      expect(persistence.getIndexDir()).toBe(path.join(tempDir, 'index'));
    });
  });
});
