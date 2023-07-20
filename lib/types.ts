export type UsageCategory =
  | 'common'
  | 'core'
  | 'obscure'
  | 'rare'
  | 'uncommon'
  | 'widespread'

export type EnglishDefinition = {
  en: string
}

export type Word = {
  word: string
  usage_category: UsageCategory
  def: EnglishDefinition
}

export type WordData = {
  [key: string]: Word
}

export type TokiPonaDictionary = {
  data: WordData
}

export type GroupedTokiPonaData = { [category in UsageCategory]?: WordData }

export type FlattenedTokiPonaData = {
  word: string
  usage_category: UsageCategory
  def: EnglishDefinition
}[]

export type IndexPageSearchParams = {
  category: string[] | string
}
