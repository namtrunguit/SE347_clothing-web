import { useState, useRef } from 'react'
import Button from '@/components/common/Button'

interface FileUploadProps {
  accept?: string
  maxSize?: number // in MB
  onFileSelect: (file: File) => void
  currentFileUrl?: string
  label?: string
  disabled?: boolean
}

const FileUpload = ({
  accept = 'image/*',
  maxSize = 5,
  onFileSelect,
  currentFileUrl,
  label = 'Upload file',
  disabled = false,
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentFileUrl || null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    setError(null)

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSize) {
      setError(`File quá lớn. Kích thước tối đa: ${maxSize}MB`)
      return
    }

    // Check file type
    if (accept.includes('image/*')) {
      if (!file.type.startsWith('image/')) {
        setError('File phải là hình ảnh')
        return
      }
    }

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }

    onFileSelect(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    setPreview(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-text-main dark:text-white">
        {label}
      </label>

      {/* Current file preview */}
      {currentFileUrl && !preview && (
        <div className="relative inline-block">
          <img
            src={currentFileUrl}
            alt="Current file"
            className="h-32 w-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
          />
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            aria-label="Remove file"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Upload area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={disabled ? undefined : handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled}
        />
        <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500 mb-2">
          cloud_upload
        </span>
        <p className="text-sm text-text-main dark:text-white mb-1">
          Kéo thả file vào đây hoặc click để chọn
        </p>
        <p className="text-xs text-text-sub dark:text-gray-400">
          {accept.includes('image/*') ? 'Hình ảnh' : 'File'} tối đa {maxSize}MB
        </p>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {/* Action buttons */}
      {preview && (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleRemove}
            disabled={disabled}
          >
            Xóa
          </Button>
        </div>
      )}
    </div>
  )
}

export default FileUpload

