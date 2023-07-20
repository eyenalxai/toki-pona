import { Words } from '@/components/words'
import { IndexPageSearchParams, UsageCategory } from '@/lib/types'
import {
  ALL_CATEGORIES,
  getFlattenedTokiPonaData
} from '@/lib/lang-data/get-lang-data'
import { cn } from '@/lib/utils'

type IndexProps = {
  searchParams: IndexPageSearchParams
}

export default async function Index({ searchParams }: IndexProps) {
  const categories = (
    Array.isArray(searchParams.category)
      ? (searchParams.category as UsageCategory[])
      : ([searchParams.category] as UsageCategory[])
  ).filter(category =>
    ALL_CATEGORIES.includes(category as UsageCategory)
  ) as UsageCategory[]

  const flattenedData = await getFlattenedTokiPonaData(categories)

  console.log('categories', categories)
  console.log('categories.length', categories.length)

  return (
    <main className={cn('container', 'mx-auto', 'max-w-2xl')}>
      <Words
        flattenedData={flattenedData}
        allCategories={ALL_CATEGORIES}
        selectedCategories={categories.length > 0 ? categories : ['core']}
      />
    </main>
  )
}
