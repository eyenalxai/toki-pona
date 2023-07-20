import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { usePathname, useRouter } from 'next/navigation'
import { stringify } from 'qs'
import { UsageCategory } from '@/lib/types'
import { cn } from '@/lib/utils'

type SelectCategoryProps = {
  allCategories: string[]
  selectedCategories?: string[]
}

export const SelectCategory = ({
  allCategories,
  selectedCategories
}: SelectCategoryProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const placeholder = 'select categories'
  const selectedThings = selectedCategories ? selectedCategories : []

  const selectedThingValues = allCategories.filter(thing =>
    selectedThings.includes(thing)
  )
  const unselectedThingValues = allCategories.filter(
    thing => !selectedThings.includes(thing)
  )

  const toggleCategory = (category: UsageCategory) => {
    const newCategories = selectedThings.includes(category)
      ? selectedThings.filter(thing => thing !== category)
      : [...selectedThings, category]
    const formattedQueryParams = stringify(
      {
        category: newCategories.length > 0 ? newCategories : ['core']
      },
      { encode: false, indices: false }
    )

    router.push(`${pathname}?${formattedQueryParams}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={cn('mb-12')}>
          {placeholder}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn('w-56')}>
        {selectedThingValues.length > 0 && (
          <>
            <DropdownMenuSeparator />

            {selectedThingValues.map(thing => (
              <DropdownMenuCheckboxItem
                key={thing}
                checked={selectedThings.includes(thing)}
                onSelect={e => {
                  e.preventDefault()
                }}
                onCheckedChange={() => toggleCategory(thing as UsageCategory)}
              >
                {thing}
              </DropdownMenuCheckboxItem>
            ))}
          </>
        )}
        {unselectedThingValues.length > 0 && (
          <>
            <DropdownMenuSeparator />
            {unselectedThingValues.map(thing => (
              <DropdownMenuCheckboxItem
                key={thing}
                checked={selectedThings.includes(thing)}
                onSelect={e => {
                  e.preventDefault()
                }}
                onCheckedChange={() => toggleCategory(thing as UsageCategory)}
              >
                {thing}
              </DropdownMenuCheckboxItem>
            ))}
          </>
        )}

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
