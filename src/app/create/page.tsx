import { SearchParams } from '@/shared/types'
import { PreviewBlock } from '@/widgets/PreviewBlock'
import { ResumeCreateBlock } from './components/ResumeCreateBlock'

export default async function Create({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const type = (await searchParams).type

  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-4 flex flex-col">
      <main className="justify-center align-middle w-full flex flex-1 h-full items-center">
        <ResumeCreateBlock />
        <PreviewBlock />
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  )
}
