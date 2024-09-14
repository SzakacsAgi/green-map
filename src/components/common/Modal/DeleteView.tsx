import { useTranslation } from 'react-i18next'
import SecondaryButton from '../Button/SecondaryButton'
import { TrashIcon } from '@heroicons/react/24/outline'
import { PoiData } from '../../../interfaces'
import { FormEvent } from 'react'
import AttentionButton from '../Button/AttentionButton'

interface DeleteViewProps {
  data?: PoiData | null
  onClose: () => void
  onSubmit: (data: PoiData) => void
}

const DeleteView: React.FunctionComponent<DeleteViewProps> = ({ data, onClose, onSubmit }) => {
  const { t } = useTranslation()

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(data as PoiData)
  }

  return (
    <form onSubmit={(e) => handleOnSubmit(e)} noValidate className="flex flex-col gap-y-16 w-full pb-2 items-center">
      <div className="w-16 h-16 p-1 rounded-full bg-lightRed mr-3 flex justify-center items-center">
        <TrashIcon className="w-10 text-darkRed" />
      </div>
      <h2 className="text-2xl font-primaryFont md:text-3xl text-center dark:text-white">{t('modal.deleteMessage')}</h2>
      <div className="flex w-full lg:px-10">
        <div className="flex w-full flex-col-reverse md:flex-row justify-center gap-y-3 md:gap-x-8">
          <SecondaryButton text={t('buttonText.cancel')} type="button" onClick={onClose} />
          <AttentionButton text={t('buttonText.delete')} type="submit" />
        </div>
      </div>
    </form>
  )
}

export default DeleteView
