import { SearchParams } from '@/shared/types'

export default async function Create({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const type = (await searchParams).type

  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 flex flex-col">
      <main className="justify-center align-middle w-full flex flex-1 flex-col h-full items-center"></main>
      {type}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  )
}
