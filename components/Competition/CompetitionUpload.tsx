import { ContentContainer, ImageContainer } from "components/Container"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import {
  ArrowUpTrayIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"
import { motion } from "framer-motion"
import { Competition, Image } from "types/data"
import { useForm } from "@mantine/form"
import { Input, TextInput } from "@mantine/core"
import { CURRENT_YEAR } from "data/date/year"

interface UploadStepProps {
  state: boolean
  number: number
  title: string
  className?: string
  children?: React.ReactNode
}

interface UploadInputContainerProps {
  title: string
  children?: React.ReactNode
}

const UploadStep = (props: UploadStepProps) => {
  const { state, number, title, children, className } = props
  return (
    <div className="h-full w-full">
      <div className={`flex flex-col gap-[20px] ${className}`}>
        <p className={`transition ${state ? `opacity-100` : `opacity-30`}`}>
          <span
            className={`mr-[15px] rounded-full ${
              state ? `bg-blue-500` : `bg-white`
            } px-[5px] text-sm text-black`}
          >
            {number}
          </span>
          <span
            className={`font-semibold tracking-tight ${
              state ? `text-blue-500` : `text-white`
            }`}
          >
            {title}
          </span>
        </p>
        {children}
      </div>
    </div>
  )
}

const UploadInputContainer = (props: UploadInputContainerProps) => {
  const { title, children } = props
  return (
    <div className="flex flex-col gap-[10px]">
      <p className="text-sm">{title}</p>
      {children}
    </div>
  )
}

export const CompetitionUpload = () => {
  const [image, setImage] = useState<Image[]>([])
  const [title, setTitle] = useState<string>()
  const [eo, setEo] = useState<string>()
  const [deadline, setDeadline] = useState<string>()
  const [link, setLink] = useState<string>()
  const [level, setLevel] = useState<"Nasional" | "Internasional" | undefined>()
  const [isFree, setIsFree] = useState<boolean>(false)
  const [tags, setTags] = useState<string[]>([])
  const [description, setDescription] = useState<string>()
  /*   const [form, setForm] = useState<Competition[]>([]) */

  const form = useForm({
    initialValues: {
      title: "",
    },
  })

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.map((file: File, index: number) => {
      const reader: FileReader = new FileReader()
      reader.onload = () => {
        setImage((prev) => [
          ...prev,
          { id: index, src: reader.result?.toString(), name: file.name },
        ])
      }
      reader.readAsDataURL(file)
      return file
    })
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    maxFiles: 1,
    onDropAccepted,
  })

  return (
    <ContentContainer className="padding-y">
      <h2 className="text-[24px] font-semibold md:text-[36px]">
        Unggah kompetisi
      </h2>
      <ContentContainer className="padding-y grid grid-cols-1 gap-[30px] md:grid-cols-2">
        <UploadStep
          state={image && image.length > 0}
          number={1}
          title="Unggah poster lomba"
          className="sticky top-[20px]"
        >
          {image && image.length > 0 ? (
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col gap-[20px]"
            >
              <ImageContainer src={image[0].src} />
              <button
                className="tracking-tight opacity-50 transition hover:underline hover:opacity-80"
                onClick={() => setImage([])}
              >
                Klik untuk ganti poster
              </button>
            </motion.div>
          ) : (
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.25 }}
              {...getRootProps({ className: "dropzone" })}
              className={`group mx-auto flex min-h-[500px] w-full flex-col items-center justify-center rounded-md border-[2px] border-opacity-20 p-[25px] text-white transition hover:cursor-pointer hover:border-opacity-50 hover:bg-gray-800 ${
                isDragAccept
                  ? "border-green-400 border-opacity-100 bg-green-900 bg-opacity-20 !text-green-400 text-opacity-100"
                  : "border-dashed"
              } ${
                isDragReject
                  ? "cursor-no-drop border-solid border-red-400 border-opacity-100 !bg-red-900 !bg-opacity-20 !text-red-400"
                  : "border-dashed border-white border-opacity-20"
              }`}
            >
              <input
                {...getInputProps()}
                className={`h-full w-full ${
                  isDragReject ? "!cursor-not-allowed" : ""
                }`}
              />
              {!isDragActive && (
                <ArrowUpTrayIcon className="h-5 w-5 opacity-50 transition group-hover:opacity-100" />
              )}
              {isDragAccept && (
                <CheckCircleIcon className="h-5 w-5 opacity-50 transition group-hover:opacity-100" />
              )}
              {isDragReject && (
                <XCircleIcon className="h-5 w-5 opacity-50 transition group-hover:opacity-100" />
              )}
              <p className="text-md my-[20px] mx-auto text-center font-medium tracking-tight opacity-50 transition group-hover:opacity-100">
                {!isDragActive &&
                  `Tarik poster lomba ke sini atau klik untuk mengunggah`}
                {isDragAccept && `Poster dapat diunggah`}
                {isDragReject &&
                  `Hanya mendukung file poster berjenis .png, .jpg, dan .jpeg`}
              </p>
            </motion.div>
          )}
        </UploadStep>
        <div className="flex flex-col gap-[40px]">
          <UploadStep
            state={image && image.length > 0}
            number={2}
            title="Isi deskripsi lomba"
          >
            <div className="flex flex-col gap-[20px]">
              <UploadInputContainer title="Nama lomba">
                <TextInput
                  className="text-white/80"
                  placeholder={`EPSILON ${CURRENT_YEAR}, COMPFEST ${CURRENT_YEAR}, dll`}
                />
              </UploadInputContainer>
              <UploadInputContainer title="Penyelenggara lomba">
                <TextInput
                  className="text-white/80"
                  placeholder={`EPSILON ${CURRENT_YEAR}, COMPFEST ${CURRENT_YEAR}, dll`}
                />
              </UploadInputContainer>
              <UploadInputContainer title="Deadline lomba">
                <TextInput
                  className="text-white/80"
                  placeholder={`EPSILON ${CURRENT_YEAR}, COMPFEST ${CURRENT_YEAR}, dll`}
                />
              </UploadInputContainer>
              <UploadInputContainer title="Link pendaftaran lomba">
                <TextInput
                  className="text-white/80"
                  placeholder={`EPSILON ${CURRENT_YEAR}, COMPFEST ${CURRENT_YEAR}, dll`}
                />
              </UploadInputContainer>
              <UploadInputContainer title="Tingkat lomba">
                <TextInput
                  className="text-white/80"
                  placeholder={`EPSILON ${CURRENT_YEAR}, COMPFEST ${CURRENT_YEAR}, dll`}
                />
              </UploadInputContainer>
              <UploadInputContainer title="Pendaftaran lomba">
                <TextInput
                  className="text-white/80"
                  placeholder={`EPSILON ${CURRENT_YEAR}, COMPFEST ${CURRENT_YEAR}, dll`}
                />
              </UploadInputContainer>
              <UploadInputContainer title="Jenis lomba">
                <TextInput
                  className="text-white/80"
                  placeholder={`EPSILON ${CURRENT_YEAR}, COMPFEST ${CURRENT_YEAR}, dll`}
                />
              </UploadInputContainer>
              <UploadInputContainer title="Deskripsi lomba">
                <TextInput
                  className="text-white/80"
                  placeholder={`EPSILON ${CURRENT_YEAR}, COMPFEST ${CURRENT_YEAR}, dll`}
                />
              </UploadInputContainer>
              <UploadInputContainer title="Pendaftaran lomba">
                <TextInput
                  className="text-white/80"
                  placeholder={`EPSILON ${CURRENT_YEAR}, COMPFEST ${CURRENT_YEAR}, dll`}
                />
              </UploadInputContainer>
              <UploadInputContainer title="Jenis lomba">
                <TextInput
                  className="text-white/80"
                  placeholder={`EPSILON ${CURRENT_YEAR}, COMPFEST ${CURRENT_YEAR}, dll`}
                />
              </UploadInputContainer>
              <UploadInputContainer title="Deskripsi lomba">
                <TextInput
                  className="text-white/80"
                  placeholder={`EPSILON ${CURRENT_YEAR}, COMPFEST ${CURRENT_YEAR}, dll`}
                />
              </UploadInputContainer>
            </div>
          </UploadStep>
          <UploadStep
            state={image && image.length > 0}
            number={3}
            title="Bayar"
          ></UploadStep>
        </div>
      </ContentContainer>
    </ContentContainer>
  )
}
