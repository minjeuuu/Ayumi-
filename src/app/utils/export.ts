import { toast } from 'sonner';

export async function exportToFormat(content: string, format: string, filename: string = 'ayumi-export') {
  try {
    let blob: Blob;
    let mimeType: string;
    let extension: string;

    switch (format.toLowerCase()) {
      case 'txt':
        blob = new Blob([content], { type: 'text/plain' });
        mimeType = 'text/plain';
        extension = 'txt';
        break;
      case 'html':
        const htmlContent = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${filename}</title></head>
<body style="font-family: system-ui; padding: 2rem; max-width: 800px; margin: 0 auto;">
${content}
</body></html>`;
        blob = new Blob([htmlContent], { type: 'text/html' });
        mimeType = 'text/html';
        extension = 'html';
        break;
      case 'md':
        blob = new Blob([content], { type: 'text/markdown' });
        mimeType = 'text/markdown';
        extension = 'md';
        break;
      case 'json':
        blob = new Blob([content], { type: 'application/json' });
        mimeType = 'application/json';
        extension = 'json';
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(`Exported as ${extension.toUpperCase()}`);
    return true;
  } catch (error) {
    console.error('Export error:', error);
    toast.error('Failed to export');
    return false;
  }
}

export async function shareContent(title: string, text: string, url?: string) {
  try {
    if (navigator.share) {
      await navigator.share({
        title,
        text,
        url: url || window.location.href,
      });
      toast.success('Shared successfully');
      return true;
    } else {
      await copyToClipboard(text);
      toast.success('Copied to clipboard');
      return true;
    }
  } catch (error) {
    console.error('Share error:', error);
    if ((error as Error).name !== 'AbortError') {
      toast.error('Failed to share');
    }
    return false;
  }
}

export async function copyToClipboard(text: string) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast.success('Copied to clipboard');
      return true;
    }
  } catch (error) {
    console.error('Copy error:', error);
    toast.error('Failed to copy');
    return false;
  }
}

export async function downloadImage(dataUrl: string, filename: string = 'ayumi-image.png') {
  try {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('Image downloaded');
    return true;
  } catch (error) {
    console.error('Download error:', error);
    toast.error('Failed to download');
    return false;
  }
}

export function saveToLocalStorage(key: string, data: any) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Save error:', error);
    toast.error('Failed to save');
    return false;
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Load error:', error);
    return defaultValue;
  }
}
