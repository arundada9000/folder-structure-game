import { describe, it, expect } from 'vitest';
import { validateUploadedTree, parseTreeJSON } from './validator';

describe('validateUploadedTree', () => {
  it('validates a correct tree', () => {
    const input = {
      name: 'root',
      children: [
        { name: 'src', children: [] },
        { name: 'docs', children: [] },
      ],
    };
    const result = validateUploadedTree(input);
    expect(result.valid).toBe(true);
    expect(result.tree).toBeDefined();
    expect(result.tree!.children).toHaveLength(2);
  });

  it('rejects null input', () => {
    const result = validateUploadedTree(null);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Input must be a JSON object');
  });

  it('rejects non-object input', () => {
    const result = validateUploadedTree('string');
    expect(result.valid).toBe(false);
  });

  it('rejects missing name', () => {
    const result = validateUploadedTree({ children: [] });
    expect(result.valid).toBe(false);
    expect(result.error).toContain('name');
  });

  it('rejects non-string name', () => {
    const result = validateUploadedTree({ name: 123, children: [] });
    expect(result.valid).toBe(false);
  });

  it('rejects missing children array', () => {
    const result = validateUploadedTree({ name: 'root' });
    expect(result.valid).toBe(false);
    expect(result.error).toContain('children');
  });

  it('rejects duplicate child names', () => {
    const input = {
      name: 'root',
      children: [
        { name: 'src', children: [] },
        { name: 'src', children: [] },
      ],
    };
    const result = validateUploadedTree(input);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Duplicate');
  });

  it('rejects names with invalid characters', () => {
    const input = {
      name: 'root',
      children: [
        { name: 'my folder!', children: [] },
      ],
    };
    const result = validateUploadedTree(input);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('invalid characters');
  });

  it('rejects empty name', () => {
    const input = {
      name: 'root',
      children: [
        { name: '  ', children: [] },
      ],
    };
    const result = validateUploadedTree(input);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('non-empty');
  });

  it('trims whitespace from names', () => {
    const input = {
      name: 'root',
      children: [
        { name: '  src  ', children: [] },
      ],
    };
    const result = validateUploadedTree(input);
    expect(result.valid).toBe(true);
    expect(result.tree!.children[0].name).toBe('src');
  });

  it('rejects deeply nested trees exceeding max depth', () => {
    let nested = { name: 'a', children: [] as { name: string; children: unknown[] }[] };
    for (let i = 0; i < 15; i++) {
      nested = { name: String.fromCharCode(97 + i), children: [nested] };
    }
    const input = { name: 'root', children: [nested] };
    const result = validateUploadedTree(input);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('depth');
  });

  it('allows valid special characters (hyphens, underscores, dots)', () => {
    const input = {
      name: 'my-root',
      children: [
        { name: 'test_folder', children: [] },
        { name: 'file.name', children: [] },
      ],
    };
    const result = validateUploadedTree(input);
    expect(result.valid).toBe(true);
  });
});

describe('parseTreeJSON', () => {
  it('parses valid JSON string', () => {
    const json = JSON.stringify({
      name: 'root',
      children: [{ name: 'src', children: [] }],
    });
    const result = parseTreeJSON(json);
    expect(result.valid).toBe(true);
  });

  it('rejects invalid JSON string', () => {
    const result = parseTreeJSON('{ invalid json }');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Invalid JSON');
  });

  it('rejects empty string', () => {
    const result = parseTreeJSON('');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Invalid JSON');
  });
});
