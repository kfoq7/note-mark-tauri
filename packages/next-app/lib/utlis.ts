const dateFormatter = new Intl.DateTimeFormat('es-US', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'UTC'
})

export const formatDateFromMs = (ms: number) => dateFormatter.format(ms)

export type FileMetadata = {
  secs_since_epoch: number
  nanos_since_epoch: number
}

export const formatDateFromUnix = (metadata: FileMetadata) => {
  const { nanos_since_epoch, secs_since_epoch } = metadata
  return secs_since_epoch * 1000 + Math.floor(nanos_since_epoch / 1e6)
}
