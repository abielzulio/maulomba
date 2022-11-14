import {
  ArrowUpTrayIcon,
  CheckCircleIcon,
  QrCodeIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"
import { Checkbox, MultiSelect, Radio, TextInput } from "@mantine/core"
import { DatePicker, TimeInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import Button from "components/Button"
import { ContentContainer, ImageContainer } from "components/Container"
import RichTextEditor from "components/RichTextEditor"
import { CURRENT_YEAR } from "data/date/year"
import {
  COMPETITION_FILTER_OPTIONS,
  COMPETITION_LEVEL_TYPE,
  COMPETITION_REGISTRATION_TYPE,
} from "data/options"
import {
  STRING_COMPETITION_UPLOAD_CHANGE_IMAGE_BUTTON,
  STRING_COMPETITION_UPLOAD_IMAGE_DRAG_ALLOW,
  STRING_COMPETITION_UPLOAD_IMAGE_DRAG_INIT,
  STRING_COMPETITION_UPLOAD_IMAGE_DRAG_REJECT,
  STRING_COMPETITION_UPLOAD_PAGE_TITLE,
  STRING_COMPETITION_UPLOAD_STEP,
} from "data/string"
import { COLOR_BLUE_PRIMARY, COLOR_WHITE } from "data/style"
import { motion } from "framer-motion"
import { supabase, SUPABASE_BUCKET_BASE_URL } from "lib/supabase"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { CompressResult, Image } from "types/data"
import { v4 as uuid } from "uuid"
import { decode } from "base64-arraybuffer"
import Compress from "compress.js"

interface UploadStepProps {
  state: boolean
  number: number
  title: string
  className?: string
  children?: React.ReactNode
}

interface UploadInputContainerProps {
  title: string
  description?: string
  children: React.ReactNode
}

const UploadStep = (props: UploadStepProps) => {
  const { state, number, title, children, className = "" } = props
  return (
    <div className="h-full w-full">
      <div className={`flex flex-col gap-[20px] ${className}`}>
        <p className={`transition ${state ? `opacity-100` : `opacity-30`}`}>
          <span
            className={`mr-[15px] rounded-full transition ${
              state ? `bg-blue-500` : `bg-white`
            } px-[8px] py-[4px] text-sm text-black`}
          >
            {number + 1}
          </span>
          <span
            className={`text-xl font-semibold tracking-tight transition ${
              state ? `text-blue-500` : `text-white`
            }`}
          >
            {title}
          </span>
        </p>
        <div className="h-fit w-full overflow-scroll">{children}</div>
      </div>
    </div>
  )
}

const UploadInputContainer = (props: UploadInputContainerProps) => {
  const { title, children, description } = props
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[5px]">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-[12px] font-medium opacity-50">{description}</p>
      </div>
      <div className={`flex ${children! > 1 ? `gap-[20px]` : `gap-[10px]`}`}>
        {children}
      </div>
    </div>
  )
}

export const CompetitionUpload = () => {
  const [image, setImage] = useState<Image[]>([])
  const [description, setDescription] = useState<string>("")
  const [isDescriptionValid, setIsDescriptionValid] = useState<boolean>(true)
  const [isImageValid, setIsImageValid] = useState<boolean>(true)
  const [isStepOneValid, setIsStepOneValid] = useState<boolean>(false)
  const [isStepTwoValid, setIsStepTwoValid] = useState<boolean>(false)

  const date_now = new Date()

  const form = useForm({
    initialValues: {
      title: "",
      eo: "",
      img: "",
      deadlineDate: date_now,
      deadlineTime: date_now,
      link: "",
      level: "Nasional",
      registration: "Gratis",
      tags: [],
      isPremium: true,
      isCustom: true,
      description: description,
    },

    validate: {
      title: (value) => (value ? null : "Nama kompetisi harus diisi"),
      eo: (value) =>
        value ? null : "Nama penyelenggara kompetisi harus diisi",
      deadlineDate: (value) =>
        value == null ? "Tanggal deadline harus diisi" : null,
      deadlineTime: (value) =>
        value == null ? "Jam deadline harus diisi" : null,
      link: (value) => (value ? null : "Link kompetisi harus diisi"),
      tags: (value) =>
        value.length > 0 ? null : "Kategori harus diisi minimal satu",
    },
  })

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    const compress = new Compress()
    compress
      .compress(acceptedFiles, {
        maxWidth: 1240,
        maxHeight: 1240,
        resize: true,
      })
      .then((data) => {
        data.map((file: CompressResult, index: number) => {
          setImage((prev) => [
            ...prev,
            {
              id: index,
              data: file.data,
              src: file.prefix + file.data,
              name: file.alt,
              type:
                file.alt.toLowerCase().match(/\.(jpe?g|png)$/i)?.[0] ??
                file.ext.replace("image/", "."),
              mime: file.ext,
            },
          ])
        })
      })
      .catch((err) => {
        alert(err)
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
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    onDropAccepted,
  })

  useEffect(() => {
    if (description.length > 10) {
      setIsDescriptionValid(true)
      form.setFieldValue("description", description)
    }
  }, [description])

  useEffect(() => {
    if (image.length > 0) {
      setIsImageValid(true)
    }
  }, [image])

  useEffect(() => {
    form.isValid() && description.length > 10
      ? setIsStepOneValid(true)
      : setIsStepOneValid(false)
  }, [form, description])

  useEffect(() => {
    isStepOneValid && image.length > 0
      ? setIsStepTwoValid(true)
      : setIsStepTwoValid(false)
  }, [isStepOneValid, image])

  const handleDescriptionValidation = () => {
    description.length > 10
      ? setIsDescriptionValid(true)
      : setIsDescriptionValid(false)
  }

  const handleImageValidation = () => {
    image.length > 0 ? setIsImageValid(true) : setIsImageValid(false)
  }

  const handleChangeImage = () => {
    setImage([])
    setIsImageValid(true)
  }

  const handleFormValidation = () => {
    form.validate()
    handleDescriptionValidation()
    handleImageValidation()
  }

  const handleFormSubmit = async () => {
    handleFormValidation()
    if (isStepTwoValid) {
      const random_uuid = uuid()
      const image_file_name = `${random_uuid}${image[0].type}`
      const img_url = `${SUPABASE_BUCKET_BASE_URL}/competition-img/${image_file_name}`
      const deadline_time = `${form.values.deadlineTime.getHours()}:${form.values.deadlineTime.getMinutes()}:${form.values.deadlineTime.getSeconds()}`
      await supabase.storage
        .from("competition-img")
        .upload(image_file_name, decode(image[0].data), {
          contentType: image[0].mime,
        })
      const { data, error } = await supabase
        .from("competitions")
        .insert({
          uuid: random_uuid,
          title: form.values.title,
          eo: form.values.eo,
          img: img_url,
          link: form.values.link,
          level: form.values.level,
          deadline_date: form.values.deadlineDate,
          deadline_time: deadline_time,
          registration: form.values.registration,
          tags: form.values.tags,
          is_premium: form.values.isPremium,
          description: form.values.description,
        })
        .select()
      console.table(data)
    }
  }

  return (
    <ContentContainer className="padding-y">
      <h2 className="text-[24px] font-semibold md:text-[36px]">
        {STRING_COMPETITION_UPLOAD_PAGE_TITLE}
      </h2>
      <ContentContainer className="padding-y grid grid-cols-1 gap-[30px] xl:grid-cols-3">
        <UploadStep
          state={isStepOneValid}
          number={0}
          title={STRING_COMPETITION_UPLOAD_STEP[0]}
        >
          <form className="flex flex-col gap-[20px]">
            <UploadInputContainer title="Nama kompetisi">
              <TextInput
                className="w-full text-white/80"
                {...form.getInputProps("title")}
                placeholder={`EPSILON ${CURRENT_YEAR}, COMPFEST ${CURRENT_YEAR}, dll`}
              />
            </UploadInputContainer>
            <UploadInputContainer title="Penyelenggara kompetisi">
              <TextInput
                className="w-full text-white/80"
                {...form.getInputProps("eo")}
                placeholder={`Himpunan Teknik Fisika UGM, ASEAN, dll`}
              />
            </UploadInputContainer>
            <UploadInputContainer title="Deadline kompetisi">
              <>
                <DatePicker
                  className="w-full"
                  minDate={new Date()}
                  {...form.getInputProps("deadlineDate")}
                  inputFormat="D MMMM YYYY"
                  labelFormat="MMMM YYYY"
                  placeholder="Tanggal deadline"
                />
                <TimeInput
                  withSeconds
                  className="w-full"
                  {...form.getInputProps("deadlineTime")}
                  placeholder="Waktu deadline"
                  clearable
                />
              </>
            </UploadInputContainer>
            <UploadInputContainer title="Link pendaftaran kompetisi">
              <TextInput
                className="w-full text-white/80"
                {...form.getInputProps("link")}
                placeholder={`ugm.id/epsilon-${CURRENT_YEAR}`}
              />
            </UploadInputContainer>
            <UploadInputContainer title="Tingkat kompetisi">
              <Radio.Group
                className="font-white ml-[4px] -mt-[10px] flex w-full gap-[30px]"
                {...form.getInputProps("level")}
              >
                {COMPETITION_LEVEL_TYPE.map((option, id) => (
                  <Radio
                    size="xs"
                    key={id}
                    className="text-sm"
                    classNames={{ body: "white" }}
                    value={option}
                    label={option}
                    styles={() => ({
                      label: {
                        color: COLOR_WHITE,
                      },
                      radio: {
                        "&:checked": {
                          backgroundColor: `${COLOR_BLUE_PRIMARY} !important`,
                        },
                      },
                    })}
                  />
                ))}
              </Radio.Group>
            </UploadInputContainer>
            <UploadInputContainer title="Pendaftaran kompetisi">
              <Radio.Group
                className="font-white ml-[4px] -mt-[10px] flex w-full gap-[30px]"
                {...form.getInputProps("registration")}
              >
                {COMPETITION_REGISTRATION_TYPE.map((option, id) => (
                  <Radio
                    size="xs"
                    key={id}
                    className="text-sm"
                    classNames={{ body: "white" }}
                    value={option}
                    label={option}
                    styles={() => ({
                      label: {
                        color: COLOR_WHITE,
                        fontSize: "0.875rem",
                      },
                      radio: {
                        "&:checked": {
                          backgroundColor: `${COLOR_BLUE_PRIMARY} !important`,
                        },
                      },
                    })}
                  />
                ))}
              </Radio.Group>
            </UploadInputContainer>
            <UploadInputContainer
              title="Kategori kompetisi"
              description="Pilih kategori maksimal 3"
            >
              <MultiSelect
                className="w-full text-white/80"
                searchable
                clearable
                nothingFound="Kategori kompetisi tidak ada"
                {...form.getInputProps("tags")}
                data={COMPETITION_FILTER_OPTIONS}
                placeholder="Pilih tiga kategori"
                maxSelectedValues={3}
              />
            </UploadInputContainer>
            <UploadInputContainer title="Deskripsi kompetisi">
              <RichTextEditor
                isValid={isDescriptionValid}
                setContent={setDescription}
                placeholder="Kompetisi ini merupakan ... "
              />
            </UploadInputContainer>
          </form>
        </UploadStep>
        <UploadStep
          state={isStepTwoValid}
          number={1}
          title={STRING_COMPETITION_UPLOAD_STEP[1]}
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
              {image[0].src && (
                <ImageContainer
                  className="border-[0.5px] border-white border-opacity-30"
                  src={image[0].src}
                />
              )}
              <button
                className="tracking-tight opacity-50 transition hover:underline hover:opacity-80"
                onClick={handleChangeImage}
              >
                {STRING_COMPETITION_UPLOAD_CHANGE_IMAGE_BUTTON}
              </button>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-[5px]">
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
                    : `border-dashed ${
                        isImageValid
                          ? "border-white border-opacity-20"
                          : "border-red-500 border-opacity-100"
                      }`
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
                  {!isDragActive && STRING_COMPETITION_UPLOAD_IMAGE_DRAG_INIT}
                  {isDragAccept && STRING_COMPETITION_UPLOAD_IMAGE_DRAG_ALLOW}
                  {isDragReject && STRING_COMPETITION_UPLOAD_IMAGE_DRAG_REJECT}
                </p>
              </motion.div>
              {!isImageValid && (
                <p className="text-[11px] font-medium text-[#fa5252]">
                  Poster lomba harus diunggah
                </p>
              )}
            </div>
          )}
        </UploadStep>
        <UploadStep
          state={isStepTwoValid}
          number={2}
          title={STRING_COMPETITION_UPLOAD_STEP[2]}
          className="sticky top-[20px]"
        >
          <div className="flex flex-col gap-[20px]">
            <div className="flex justify-between gap-[20px]">
              <Checkbox
                label="Tayang kompetisi di paling atas hingga deadline"
                radius="sm"
                styles={() => ({
                  label: {
                    color: COLOR_WHITE,
                    paddingLeft: "0px",
                  },
                  labelWrapper: {
                    marginLeft: "12px",
                  },
                  input: {
                    "&:checked": {
                      backgroundColor: `${COLOR_BLUE_PRIMARY} !important`,
                    },
                  },
                })}
                {...form.getInputProps("isPremium", { type: "checkbox" })}
              />
              <p
                className={`font-mono text-green-500 transition ${
                  form.values.isPremium ? `opacity-100` : `opacity-0`
                }`}
              >
                +Rp30.000
              </p>
            </div>
            {/*             <div className="flex justify-between gap-[20px]">
              <Checkbox
                label="Buat link share sendiri (maulom.ba/kompetisi-anda)"
                radius="sm"
                styles={() => ({
                  label: {
                    color: COLOR_WHITE,
                    paddingLeft: "0px",
                  },
                  labelWrapper: {
                    marginLeft: "12px",
                  },
                  lave: {
                    "&:checked": {
                      backgroundColor: `${COLOR_BLUE_PRIMARY} !important`,
                    },
                  },
                })}
                {...form.getInputProps("isCustom", { type: "checkbox" })}
              />
              <p
                className={`font-mono text-green-500 transition ${
                  form.values.isCustom ? `opacity-100` : `opacity-0`
                }`}
              >
                +Rp30.000
              </p>
            </div> */}
          </div>
          <Button
            kind="primary"
            type="submit"
            size="medium"
            width="full"
            className={`my-[20px] ${
              isStepTwoValid
                ? `cursor-pointer opacity-100`
                : `cursor-not-allowed opacity-50 grayscale`
            }`}
            /*             disabled={!form.isValid()} */
            icon={
              form.values.isPremium ? (
                <QrCodeIcon className="h-4 w-4" />
              ) : (
                <ArrowUpTrayIcon className="h-4 w-4" />
              )
            }
            onClick={handleFormSubmit}
            title={`${
              form.values.isPremium
                ? `Bayar lalu unggah`
                : `Unggah secara gratis`
            }`}
          />
          <p
            className={`text-center font-mono text-sm transition ${
              form.values.isPremium ? `opacity-50` : `opacity-0`
            }`}
          >
            Pembayaran menggunakan QRIS dengan dukungan semua dompet digital dan
            bank lokal
          </p>
        </UploadStep>
      </ContentContainer>
    </ContentContainer>
  )
}
