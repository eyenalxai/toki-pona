'use client'

import { FlattenedTokiPonaData, UsageCategory, Word } from '@/lib/types'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SelectCategory } from '@/components/ui/select-category'

type WordsProps = {
  flattenedData: FlattenedTokiPonaData
  allCategories: UsageCategory[]
  selectedCategories: UsageCategory[]
}

export const Words = ({
  flattenedData,
  allCategories,
  selectedCategories
}: WordsProps) => {
  const [randomPicks, setRandomPicks] = useState<FlattenedTokiPonaData>([])
  const [correctChoice, setCorrectChoice] = useState<Word | null>(null)
  const [pickedChoice, setPickedChoice] = useState<Word | null>(null)

  const populateRandomPicks = () => {
    const newRandomPicks = Array.from({ length: 3 }, () => {
      const randomIndex = Math.floor(Math.random() * flattenedData.length)
      return flattenedData[randomIndex]
    })
    setRandomPicks(newRandomPicks)

    // Set a random word from randomPicks as correctChoice
    const randomChoiceIndex = Math.floor(Math.random() * newRandomPicks.length)
    setCorrectChoice(newRandomPicks[randomChoiceIndex])
  }

  useEffect(() => {
    populateRandomPicks()
  }, [flattenedData])

  if (!correctChoice || !randomPicks) return null

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'mt-24',
        'gap-4'
      )}
    >
      <SelectCategory
        allCategories={allCategories}
        selectedCategories={selectedCategories}
      />
      <div
        className={cn(
          'mx-24',
          'break-words',
          'h-64',
          'justify-center',
          'items-center'
        )}
      >
        {correctChoice.def.en}
      </div>
      <div
        className={cn(
          'flex',
          'flex-row',
          'items-center',
          'justify-center',
          'gap-4'
        )}
      >
        {randomPicks.map((word, idx) => {
          return (
            <Button
              variant={'outline'}
              key={idx}
              className={cn(
                pickedChoice === word && pickedChoice === correctChoice
                  ? 'border-green-500'
                  : pickedChoice === word && pickedChoice !== correctChoice
                  ? 'border-red-500'
                  : ''
              )}
              onClick={() => {
                setPickedChoice(word)
              }}
            >
              {word.word}
            </Button>
          )
        })}
      </div>
      <Button
        variant={'ghost'}
        onClick={() => {
          populateRandomPicks()
          setPickedChoice(null)
        }}
      >
        next
      </Button>
    </div>
  )
}
