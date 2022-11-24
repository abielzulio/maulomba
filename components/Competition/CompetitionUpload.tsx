import {
  ArrowPathIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  QrCodeIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"
import { Checkbox, MultiSelect, Radio, TextInput } from "@mantine/core"
import { DatePicker, TimeInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { decode } from "base64-arraybuffer"
import Button from "components/Button"
import { ContentContainer, ImageContainer } from "components/Container"
import RichTextEditor from "components/RichTextEditor"
import Compress from "compress.js"
import { CURRENT_YEAR } from "data/date/year"
import {
  COMPETITION_LEVEL_TYPE,
  COMPETITION_REGISTRATION_TYPE,
} from "data/options"
import { COLOR_BLUE_PRIMARY, COLOR_WHITE } from "data/style"
import { motion } from "framer-motion"
import { supabase, SUPABASE_BUCKET_BASE_URL } from "lib/supabase"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { CompressResult, Image } from "types/data"
import { getDeadlineTime, URLify } from "utils"
import { v4 as uuid } from "uuid"

interface UploadStepProps {
  state: boolean
  number: number
  title: string
  className?: string
  children?: React.ReactNode
}

interface UploadInputContainerProps {
  title?: string
  wordCount?: {
    max: number
    count: number
    state: boolean
  }
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
  const { title, children, description, wordCount } = props
  return (
    <div className="flex flex-col gap-[10px] ">
      {title && (
        <div className="flex flex-col gap-[5px] text-white">
          <div className="flex justify-between text-sm font-medium">
            <p>{title}</p>
            {wordCount && (
              <p
                className={`transition ${
                  wordCount?.count > 0 ? `opacity-50` : `opacity-0`
                } ${
                  wordCount.count >= wordCount.max
                    ? `text-red-500 opacity-100`
                    : `opacity-50`
                }`}
              >
                {wordCount?.count}/{wordCount?.max}
              </p>
            )}
          </div>
          {description && (
            <p className="text-[12px] font-medium opacity-50">{description}</p>
          )}
        </div>
      )}
      <div className={`flex ${children! > 1 ? `gap-[20px]` : `gap-[10px]`}`}>
        {children}
      </div>
    </div>
  )
}

export const CompetitionUpload = () => {
  const [image, setImage] = useState<Image[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [sources, setSources] = useState<string[]>([])
  const [isTittleTooLong, setIsTittleTooLong] = useState<boolean>(false)
  const [isEoTooLong, setIsEoTooLong] = useState<boolean>(false)
  const [description, setDescription] = useState<string>("")
  const [isDescriptionValid, setIsDescriptionValid] = useState<boolean>(true)
  const [isImageValid, setIsImageValid] = useState<boolean>(true)
  const [isStepOneValid, setIsStepOneValid] = useState<boolean>(false)
  const [isStepTwoValid, setIsStepTwoValid] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const today: Date = new Date()

  const router = useRouter()

  const NUMBER_COMPETITION_TITLE_MAX_LENGTH: number = 85
  const NUMBER_COMPETITION_EO_MAX_LENGTH: number = 50

  const form = useForm({
    initialValues: {
      title: "",
      eventOrganizer: "",
      imgUrl: "",
      slug: "",
      deadlineDate: today,
      deadlineTime: today,
      registrationUrl: "",
      contactUrl: "",
      level: "Nasional",
      registrationFee: "Gratis",
      tags: [],
      isFeatured: false,
      sources: [],
      isCustom: true,
      description: description,
    },

    validate: {
      title: (value) => {
        if (value) {
          if (value.length >= NUMBER_COMPETITION_TITLE_MAX_LENGTH) {
            return "Judul kompetisi maksimal 85 karakter"
          } else {
            return null
          }
        } else {
          return "Judul kompetisi harus diisi"
        }
      },
      eventOrganizer: (value) =>
        value ? null : "Nama penyelenggara kompetisi harus diisi",
      deadlineDate: (value) =>
        value == null ? "Tanggal deadline harus diisi" : null,
      deadlineTime: (value) =>
        value == null ? "Jam deadline harus diisi" : null,
      registrationUrl: (value) =>
        value ? null : "Link pendaftaran kompetisi harus diisi",
      contactUrl: (value) =>
        value ? null : "Link kontak kompetisi harus diisi",
      tags: (value) =>
        value.length > 0 ? null : "Kategori harus diisi minimal satu",
      sources: (value) =>
        value.length > 0 ? null : "Sumber harus diisi minimal satu",
    },
  })

  const getCompetitionTags = async () => {
    const { data: tags, error } = await supabase.from("tags").select("*")
    if (error) {
      console.log(error)
    } else {
      setTags(tags.map(({ tag }) => tag))
    }
  }

  const getSources = async () => {
    const { data: sources, error } = await supabase.from("sources").select("*")
    if (error) {
      console.log(error)
    } else {
      setSources(sources.map(({ source }) => source))
    }
  }

  useEffect(() => {
    getCompetitionTags()
  }, [])

  useEffect(() => {
    getSources()
  }, [])

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
    if (form.values.title) {
      // Check if title is too long
      if (form.values.title.length >= NUMBER_COMPETITION_TITLE_MAX_LENGTH) {
        setIsTittleTooLong(true)
      } else {
        setIsTittleTooLong(false)
      }
      // Sluggify title
      form.setFieldValue(
        "slug",
        form.values.title
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\W+/g, "-")
          .replace(/[-]+$/, "")
          .toLocaleLowerCase()
      )
    }
  }, [form.values.title])

  useEffect(() => {
    // Check if event organizer is too long
    if (form.values.eventOrganizer.length >= NUMBER_COMPETITION_EO_MAX_LENGTH) {
      setIsEoTooLong(true)
    } else {
      setIsEoTooLong(false)
    }
  }, [form.values.eventOrganizer])

  useEffect(() => {
    // Check if description is valid
    if (description.length > 10) {
      setIsDescriptionValid(true)
      form.setFieldValue("description", description)
    }
  }, [description])

  useEffect(() => {
    // Check if image is valid
    if (image.length > 0) {
      setIsImageValid(true)
    }
  }, [image])

  useEffect(() => {
    // Check if step one is valid
    image.length > 0 ? setIsStepOneValid(true) : setIsStepOneValid(false)
  }, [image])

  useEffect(() => {
    // Check if step two is valid
    isStepOneValid && form.isValid() && description.length > 10
      ? setIsStepTwoValid(true)
      : setIsStepTwoValid(false)
  }, [isStepOneValid, form, description])

  // Validate description
  const handleDescriptionValidation = () => {
    description.length > 10
      ? setIsDescriptionValid(true)
      : setIsDescriptionValid(false)
  }

  // Validate image
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
      setIsUploading(true)
      const random_uuid = uuid()
      const image_file_name = `${random_uuid}${image[0].type}`
      const img_url = `${SUPABASE_BUCKET_BASE_URL}/competition-img/${image_file_name}`
      const { data: image_data, error: image_error } = await supabase.storage
        .from("competition-img")
        .upload(image_file_name, decode(image[0].data), {
          contentType: image[0].mime,
        })

      if (image_data) {
        const { data, error } = await supabase
          .from("competitions")
          .insert({
            uuid: random_uuid,
            title: form.values.title,
            slug: form.values.slug,
            event_organizer: form.values.eventOrganizer,
            img_url: img_url,
            registration_url: URLify(form.values.registrationUrl),
            contact_url: URLify(form.values.contactUrl),
            level: form.values.level,
            deadline_date: form.values.deadlineDate,
            deadline_time: getDeadlineTime(form.values.deadlineTime),
            registration_fee: form.values.registrationFee,
            tags: form.values.tags,
            sources: form.values.sources,
            is_featured: form.values.isFeatured,
            description: form.values.description,
          })
          .select()
        if (data) {
          router.push(`/lomba/${form.values.slug}`)
        } else {
          console.table(error)
        }
      } else {
        console.table(image_error)
      }
      // add loader when: submitting -> added to supabase -> next.js generate page ondemand isr -> check if new page accesible -> then redirect to new page
    }
  }

  return (
    <ContentContainer className="padding-y">
      <h2 className="text-[24px] font-semibold text-white md:text-[36px]">
        Unggah kompetisi
      </h2>
      <ContentContainer className="padding-y grid grid-cols-1 gap-[30px] xl:grid-cols-3">
        <UploadStep
          state={isStepOneValid}
          number={0}
          title="Unggah poster kompetisi"
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
                Klik untuk ganti poster
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
                  <ArrowUpTrayIcon
                    width={18}
                    height={18}
                    className="opacity-50 transition group-hover:opacity-100"
                  />
                )}
                {isDragAccept && (
                  <CheckCircleIcon
                    width={18}
                    height={18}
                    className="opacity-50 transition group-hover:opacity-100"
                  />
                )}
                {isDragReject && (
                  <XCircleIcon
                    width={18}
                    height={18}
                    className="opacity-50 transition group-hover:opacity-100"
                  />
                )}
                <p className="text-md my-[20px] mx-auto text-center font-medium tracking-tight opacity-50 transition group-hover:opacity-100">
                  {!isDragActive &&
                    "Tarik poster kompetisi ke sini atau klik untuk mengunggah"}
                  {isDragAccept && "Poster kompetisi dapat diunggah"}
                  {isDragReject &&
                    "Hanya mendukung file poste kompetisi berjenis .png, .jpg, dan .jpeg"}
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
          number={1}
          title="Isi deskripsi kompetisi"
        >
          <form className="flex flex-col gap-[20px]">
            <UploadInputContainer
              title="Nama kompetisi"
              wordCount={{
                count: form.values.title?.length,
                max: NUMBER_COMPETITION_TITLE_MAX_LENGTH,
                state: isTittleTooLong,
              }}
            >
              <div className="flex w-full flex-col gap-[15px]">
                <TextInput
                  maxLength={NUMBER_COMPETITION_TITLE_MAX_LENGTH}
                  className="w-full text-white/80"
                  {...form.getInputProps("title")}
                  placeholder={`EPSILON ${CURRENT_YEAR}, COMPFEST ${CURRENT_YEAR}, dll`}
                />
                {form.values.title && (
                  <p
                    className={`rounded-md border-[1px] ${
                      isTittleTooLong
                        ? `border-red-500 bg-red-500/10 text-red-500`
                        : `border-blue-500 bg-blue-500/10 text-blue-500`
                    } px-[8px] pt-[6px] pb-[8px] text-sm font-medium`}
                  >
                    maulomba.com/lomba/{form.values.slug}
                  </p>
                )}
              </div>
            </UploadInputContainer>
            <UploadInputContainer
              title="Penyelenggara kompetisi"
              wordCount={{
                count: form.values.eventOrganizer?.length,
                max: NUMBER_COMPETITION_EO_MAX_LENGTH,
                state: isEoTooLong,
              }}
            >
              <TextInput
                maxLength={NUMBER_COMPETITION_EO_MAX_LENGTH}
                className="w-full text-white/80"
                {...form.getInputProps("eventOrganizer")}
                placeholder={`Himpunan Teknik Fisika UGM, ASEAN, dll`}
              />
            </UploadInputContainer>
            <UploadInputContainer
              title="Deadline kompetisi"
              description="Kompetisi akan otomatis dihapus dari laman situs ketika telah melewati deadline"
            >
              <>
                <DatePicker
                  className="w-full"
                  minDate={today}
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
                {...form.getInputProps("registrationUrl")}
                placeholder={`ugm.id/epsilon-${CURRENT_YEAR}`}
              />
            </UploadInputContainer>
            <UploadInputContainer
              title="Link narahubung"
              description="Link kontak panitia (Instagram/WhatsApp/Telegram)"
            >
              <TextInput
                className="w-full text-white/80"
                {...form.getInputProps("contactUrl")}
                placeholder={`wa.me/62812345678`}
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
            <UploadInputContainer title="Biaya pendaftaran kompetisi">
              <Radio.Group
                className="font-white ml-[4px] -mt-[10px] flex w-full gap-[30px]"
                {...form.getInputProps("registrationFee")}
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
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                nothingFound="Kategori kompetisi tidak ada"
                {...form.getInputProps("tags")}
                data={tags}
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
          number={2}
          title="Survei pengunggahan"
          className="sticky top-[20px]"
        >
          <div className="flex flex-col gap-[20px]">
            <UploadInputContainer
              title="Darimana mengetahui Maulomba?"
              description="Dapat memilih lebih dari 1 sumber"
            >
              <MultiSelect
                className="w-full text-white/80"
                searchable
                clearable
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                nothingFound="Tidak dapat ditemukan"
                {...form.getInputProps("sources")}
                data={sources}
                placeholder="Pilih sumber"
              />
            </UploadInputContainer>
            <div className="flex justify-between gap-[20px]">
              <Checkbox
                label={
                  <span>
                    {
                      "Saya ingin menayangkan kompetisi di paling atas dengan harga terjangkau "
                    }
                    <span className="text-blue-500">
                      {"(< Rp50.000, 5x lebih banyak dilihat)"}
                    </span>
                  </span>
                }
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
                {...form.getInputProps("isFeatured", { type: "checkbox" })}
              />
              {/*               <p
                className={`font-mono text-green-500 transition ${
                  form.values.isFeatured ? `opacity-100` : `opacity-0`
                }`}
              >
                +Rp50.000
              </p> */}
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
            kind={isUploading ? "neutral" : "primary"}
            type="submit"
            size="medium"
            width="full"
            className={`my-[20px] ${
              isStepTwoValid
                ? `cursor-pointer opacity-100`
                : `cursor-not-allowed opacity-50 grayscale`
            }`}
            disabled={!isStepTwoValid}
            icon={
              isUploading ? (
                <ArrowPathIcon
                  width={18}
                  height={18}
                  className="animate-spin"
                />
              ) : (
                /* form.values.isFeatured ? (
                <QrCodeIcon width={18} height={18} />
              ) :  */ <ArrowUpTrayIcon width={18} height={18} />
              )
            }
            onClick={handleFormSubmit}
            title={`${
              isUploading
                ? "Sedang mengunggah"
                : /*                 : form.values.isFeatured
                ? `Bayar lalu unggah` */
                  `Unggah secara gratis`
            }`}
          />
          {/*           <p
            className={`text-center font-mono text-sm transition ${
              form.values.isFeatured ? `opacity-50` : `opacity-0`
            }`}
          >
            Pembayaran menggunakan QRIS dengan dukungan semua dompet digital dan
            bank lokal
          </p> */}
        </UploadStep>
      </ContentContainer>
    </ContentContainer>
  )
}
