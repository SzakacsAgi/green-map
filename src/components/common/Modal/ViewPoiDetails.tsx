import { PoiData } from '../../../interfaces'
import { useTranslation } from 'react-i18next'
import { FormEvent, useState } from 'react'
import ModalForm from './EditAndAddView'
import Label from '../Label'
import PrimaryButton from '../Button/PrimaryButton'
import SecondaryButton from '../Button/SecondaryButton'
import { XMarkIcon } from '@heroicons/react/16/solid'

interface ViewPoiDetailsProps {
  data: PoiData | null
  onClose: () => void
  onSubmit: (data: PoiData) => void
}

const ViewPoiDetails: React.FunctionComponent<ViewPoiDetailsProps> = ({ data, onClose, onSubmit }) => {
  const [isUnderEdit, setIsUnderEdit] = useState(false)
  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUnderEdit(true)
  }

  const handleClose = () => {
    setIsUnderEdit(false)
  }
  const { t } = useTranslation()

  return (
    <>
      {isUnderEdit ? (
        <ModalForm onClose={handleClose} data={data} onSubmit={onSubmit} />
      ) : (
        <form onSubmit={handleEdit} noValidate className="flex flex-col gap-y-4 w-full md:py-7 md:px-10 relative">
          <XMarkIcon className="sm:hidden w-10 h-10 absolute right-0 -top-1 cursor-pointer dark:text-white hover:text-primaryGreen" onClick={onClose} />
          <h2 className="text-primaryDarkGray text-2xl font-bold font-primaryFont mb-7 dark:text-white">{data?.name}</h2>

          <div className="flex flex-col gap-7 lg:flex-row border-b border-darkGray pb-3">
            <div className="lg:w-1/2 border-b-7 border-black">
              <Label text={t('inputLabels.category')} className="text-darkGray" />
              <p className="text-xl font-bold break-all dark:text-white">{data?.category}</p>
            </div>
            <div className="lg:w-1/2 border-b-7 border-black">
              <Label text={t('inputLabels.subcategory')} className="text-darkGray" />
              <p className="text-xl font-bold break-all dark:text-white">{data?.subCategory}</p>
            </div>
          </div>
          <div className="flex flex-col gap-7 lg:flex-row border-b border-darkGray pb-3">
            <div className="lg:w-1/2 border-b-7 border-black">
              <Label text={t('inputLabels.description')} className="text-darkGray" />
              <p className="text-xl font-bold break-all dark:text-white">{data?.description}</p>
            </div>
            <div className="lg:w-1/2 border-b-7 border-black">
              <Label text={t('inputLabels.url')} className="text-darkGray" />
              <p className="text-xl font-bold break-all dark:text-white">
                <a className="hover:underline" href={data?.url} target="_blank">
                  {data?.url}
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-7 lg:flex-row border-b border-darkGray pb-3">
            <div className="lg:w-1/2 border-b-7 border-black">
              <Label text={t('inputLabels.email')} className="text-darkGray" />
              <p className="text-xl font-bold break-all dark:text-white">{data?.email}</p>
            </div>
            <div className="lg:w-1/2 border-b-7 border-black">
              <Label text={t('inputLabels.phoneNumber')} className="text-darkGray" />
              <p className="text-xl font-bold break-all dark:text-white">{data?.phoneNumber}</p>
            </div>
          </div>
          <div className="flex flex-col gap-7 lg:flex-row border-b border-darkGray pb-3">
            <div className="lg:w-1/2 border-b-7 border-black">
              <Label text={t('inputLabels.address')} className="text-darkGray" />
              <p className="text-xl font-bold break-all dark:text-white">{data?.address}</p>
            </div>
            <div className="lg:w-1/2 border-b-7 border-black">
              <Label text={t('inputLabels.openingHours')} className="text-darkGray" />
              <p className="text-xl font-bold break-all dark:text-white">{data?.openingHours}</p>
            </div>
          </div>
          <div className="flex flex-col gap-7 lg:flex-row border-b border-darkGray pb-3">
            <div className="lg:w-1/2 border-b-7 border-black">
              <Label text={t('inputLabels.longitude')} className="text-darkGray" />
              <p className="text-xl font-bold break-all dark:text-white">{data?.longitude}</p>
            </div>
            <div className="lg:w-1/2 border-b-7 border-black">
              <Label text={t('inputLabels.latitude')} className="text-darkGray" />
              <p className="text-xl font-bold break-all dark:text-white">{data?.latitude}</p>
            </div>
          </div>
          <div className="847:flex 847:justify-end pb-24 md:pb-20 lg:pb-4">
            <div className="flex mt-6 847:flex-row flex-col-reverse gap-y-3">
              <SecondaryButton text={t('buttonText.cancel')} type="button" onClick={onClose} />
              <PrimaryButton text={t('buttonText.edit')} type="submit" />
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default ViewPoiDetails
