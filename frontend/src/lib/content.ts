export const LimitContent = (limit: number, content: string) : string => {
  return content.length > limit ? content.slice(0, limit) + "..." : content
}

export const CalculateMinRead = (content : string) : number => {
  return Math.floor(content.split(" ").length / 150) || 1
}