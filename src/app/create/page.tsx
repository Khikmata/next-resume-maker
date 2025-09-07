import { SearchParams } from '@/shared/types'
import { ResumeCreateView } from './components'

export default async function Create({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return (
    <div className="font-sans items-center justify-items-center flex flex-col">
      <main className="w-full h-full">
        <ResumeCreateView />
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  )
}
