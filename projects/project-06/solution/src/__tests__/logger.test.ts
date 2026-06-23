import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logger, LogLevel, ServiceLogger } from '../services/logger';

describe('Logger', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function getLastLogCall(): Record<string, unknown> | null {
    const calls = consoleSpy.mock.calls;
    if (calls.length === 0) return null;
    return JSON.parse(calls[calls.length - 1][0] as string);
  }

  it('emits structured JSON log entries', () => {
    logger.info('test-service', 'test message', { key: 'value' });

    const entry = getLastLogCall();
    expect(entry).not.toBeNull();
    expect(entry!.timestamp).toBeDefined();
    expect(entry!.level).toBe('INFO');
    expect(entry!.service).toBe('test-service');
    expect(entry!.message).toBe('test message');
    expect((entry!.data as Record<string, unknown>).key).toBe('value');
  });

  it('emits DEBUG level logs', () => {
    logger.debug('test', 'debug message');
    const entry = getLastLogCall();
    expect(entry!.level).toBe('DEBUG');
  });

  it('emits WARN level logs via console.warn', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    logger.warn('test', 'warning message');
    expect(warnSpy).toHaveBeenCalled();
    const output = JSON.parse(warnSpy.mock.calls[0][0] as string);
    expect(output.level).toBe('WARN');
  });

  it('emits ERROR level logs via console.error', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    logger.error('test', 'error message');
    expect(errorSpy).toHaveBeenCalled();
    const output = JSON.parse(errorSpy.mock.calls[0][0] as string);
    expect(output.level).toBe('ERROR');
  });

  it('does not include data key when data is empty', () => {
    logger.info('test', 'no data');
    const entry = getLastLogCall();
    expect(entry!.data).toBeUndefined();
  });

  it('does not include data key when data object is empty', () => {
    logger.info('test', 'empty data', {});
    const entry = getLastLogCall();
    expect(entry!.data).toBeUndefined();
  });

  it('uses ISO 8601 timestamps', () => {
    logger.info('test', 'timestamp check');
    const entry = getLastLogCall();
    const date = new Date(entry!.timestamp as string);
    expect(date.toISOString()).toBe(entry!.timestamp);
  });
});

describe('ServiceLogger', () => {
  let serviceLog: ServiceLogger;

  beforeEach(() => {
    serviceLog = logger.forService('my-service');
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a ServiceLogger scoped to the service name', () => {
    expect(serviceLog).toBeDefined();
    expect(serviceLog).toBeInstanceOf(ServiceLogger);
  });

  it('delegates debug to Logger with correct service name', () => {
    const spy = vi.spyOn(logger, 'debug');
    serviceLog.debug('test message', { key: 'val' });
    expect(spy).toHaveBeenCalledWith('my-service', 'test message', { key: 'val' });
  });

  it('delegates info to Logger with correct service name', () => {
    const spy = vi.spyOn(logger, 'info');
    serviceLog.info('info message');
    expect(spy).toHaveBeenCalledWith('my-service', 'info message', undefined);
  });

  it('delegates warn to Logger with correct service name', () => {
    const spy = vi.spyOn(logger, 'warn');
    serviceLog.warn('warn message');
    expect(spy).toHaveBeenCalledWith('my-service', 'warn message', undefined);
  });

  it('delegates error to Logger with correct service name', () => {
    const spy = vi.spyOn(logger, 'error');
    serviceLog.error('error message', { code: 500 });
    expect(spy).toHaveBeenCalledWith('my-service', 'error message', { code: 500 });
  });
});

describe('LogLevel filtering', () => {
  it('respects minimum log level', () => {
    const filteredLogger = new (logger.constructor as new (level: LogLevel) => typeof logger)(LogLevel.WARN);
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

    filteredLogger.debug('test', 'should not appear');
    filteredLogger.info('test', 'should not appear');
    expect(spy).not.toHaveBeenCalled();
  });

  it('allows WARN and ERROR through when min level is WARN', () => {
    const filteredLogger = new (logger.constructor as new (level: LogLevel) => typeof logger)(LogLevel.WARN);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    filteredLogger.warn('test', 'warning');
    filteredLogger.error('test', 'error');
    expect(warnSpy).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
  });
});
