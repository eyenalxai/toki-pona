import {
  FlattenedTokiPonaData,
  GroupedTokiPonaData,
  TokiPonaDictionary,
  UsageCategory,
  WordData
} from '@/lib/types'
import fs from 'fs'
import path from 'node:path'

const LANG_DATA_FOLDER = path.resolve(process.cwd(), 'lib/lang-data')

export const ALL_CATEGORIES = [
  'common',
  'core',
  'obscure',
  'rare',
  'uncommon',
  'widespread'
] as UsageCategory[]

export const getAllTokiPonaData = async (): Promise<GroupedTokiPonaData> => {
  const rawData = await fs.promises.readFile(
    `${LANG_DATA_FOLDER}/toki-pona-data.json`,
    'utf-8'
  )
  const dictionary: TokiPonaDictionary = JSON.parse(rawData)

  const langData: { [category in UsageCategory]?: WordData } = {}

  for (const key in dictionary.data) {
    const wordData = dictionary.data[key]
    const category = wordData.usage_category

    if (!langData[category]) {
      langData[category] = {}
    }

    langData[category]![key] = wordData
  }

  return langData
}

export const getTokiPonaDataByCategories = async (
  categories: UsageCategory[]
): Promise<GroupedTokiPonaData> => {
  const allData = await getAllTokiPonaData()

  return Object.fromEntries(
    Object.entries(allData).filter(([category]) =>
      categories.includes(category as UsageCategory)
    )
  )
}

export const getFlattenedTokiPonaData = async (categories: UsageCategory[]) => {
  const usageCategories: UsageCategory[] = categories.filter(category =>
    ALL_CATEGORIES.includes(category as UsageCategory)
  ) as UsageCategory[]

  const groupedTokiPonaData = await getTokiPonaDataByCategories(
    usageCategories.length ? usageCategories : ['core']
  )

  return Object.values(groupedTokiPonaData).flatMap(wordData =>
    Object.values(wordData)
  ) as FlattenedTokiPonaData
}
