"use client"

import Button from "@/components/button"
import DateInput from "@/components/input/date"
import Input from "@/components/input/input"
import Select from "@/components/input/select"
import TextArea from "@/components/input/textArea"
import Modal from "@/components/modal"
import { useGetCohorts } from "@/services/cohort.service"
import { useGetCourses } from "@/services/course.service"
import { useAddPartner } from "@/services/partnership.service"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as yup from "yup"

interface TModal {
  open: boolean
  handleClose: () => void
  refetch?: () => void
}

type Option = {
  label: string
  value: string
}

// Original interface for the API
export interface TAddPartner {
  partnerName: string
  email: string
  phone: string
  cohortIds: string[]
  courseIds: string[]
  isForAllCourses: boolean
  numberOfadvertisers: number
  discount: number
  scholarshipDescription: string
  amountPledged: number
  startDate: string
  endDate: string
}

// Form interface that matches the yup schema
interface TPartnerForm {
  partnerName: string
  email: string
  phone: string
  cohortIds: string
  courseIds: string
  isForAllCourses: boolean
  numberOfadvertisers: number
  discount: number
  scholarshipDescription: string
  amountPledged: number
  startDate: string
  endDate: string
}

const partnerSchema = yup.object({
  partnerName: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  cohortIds: yup.string().required("Select a cohort"),
  courseIds: yup.string().required("Select a course"),
  isForAllCourses: yup.boolean().required("Specify if it's for all courses"),
  numberOfadvertisers: yup
    .number()
    .typeError("Must be a number")
    .min(1, "At least 1 advertiser")
    .required("Number of advertisers is required"),
  discount: yup
    .number()
    .typeError("Discount must be a number")
    .min(0, "Cannot be negative")
    .required("Discount is required"),
  scholarshipDescription: yup.string().required("Description is required"),
  amountPledged: yup.number().typeError("Must be a number").min(0, "Cannot be negative").required("Amount is required"),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().required("End date is required"),
})

const CreatePartner = ({ open, handleClose, refetch }: TModal) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TPartnerForm>({
    mode: "onBlur",
    resolver: yupResolver(partnerSchema),
  })

  const create = useAddPartner()

  const onSubmit = (data: TPartnerForm) => {
    const transformedData: TAddPartner = {
      ...data,
      courseIds: data.courseIds ? [data.courseIds] : [],
      cohortIds: data.cohortIds ? [data.cohortIds] : [],
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    }

    console.log("Form Data: ", transformedData)
    create.mutate(transformedData, {
      onSuccess: () => {
        toast.success("Partner created successfully!")
        refetch?.()
        handleClose()
        reset()
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.error?.description ?? "An error occurred while creating partner")
      },
    })
  }

  const [courseOptions, setCourseOptions] = useState<Option[]>([])
  const [cohortOptions, setCohortOptions] = useState<Option[]>([])

  const { data: courses } = useGetCourses({ PageSize: 30 })
  const { data: cohorts } = useGetCohorts({ PageSize: 30 })

  useEffect(() => {
    if (courses) {
      const format = courses.items.map((item: any) => ({
        label: item.courseName ?? "-",
        value: item.id ?? "-",
      }))
      setCourseOptions(format)
    }
  }, [courses])

  useEffect(() => {
    if (cohorts) {
      const format = cohorts.items.map((item: any) => ({
        label: item.note ?? "-",
        value: item.id ?? "-",
      }))
      setCohortOptions(format)
    }
  }, [cohorts])

  return (
    <Modal open={open} handleClose={handleClose} className="w-[700px] p-14">
      <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">Create a Partner</p>
        <section className="w-full flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              label="Name"
              placeholder="Enter Partner Name"
              register={register("partnerName")}
              error={errors.partnerName}
            />
            <Input label="Email" placeholder="Enter email" register={register("email")} error={errors.email} />
            <Input
              label="Phone Number"
              placeholder="Enter phone number"
              register={register("phone")}
              error={errors.phone}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              label="Number of advertisers"
              type="number"
              placeholder="Enter number of advertisers"
              register={register("numberOfadvertisers")}
              error={errors.numberOfadvertisers}
            />
            <DateInput
              label="Start Date"
              name="startDate"
              placeholder="dd/mm/yy"
              control={control}
              error={errors.startDate}
            />
            <DateInput
              label="End Date"
              name="endDate"
              placeholder="dd/mm/yy"
              control={control}
              error={errors.endDate}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Select
              label="Course"
              name="courseIds"
              options={courseOptions}
              control={control}
              error={errors?.courseIds?.message}
              placeholder="Select course"
            />
            <Select
              label="Cohort"
              name="cohortIds"
              options={cohortOptions}
              control={control}
              error={errors?.cohortIds?.message}
              placeholder="Select cohort"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              label="Discount (%)"
              type="number"
              placeholder="Enter discount"
              register={register("discount")}
              error={errors.discount}
            />
            <Input
              label="Amount Pledged"
              type="number"
              placeholder="Enter amount pledged"
              register={register("amountPledged")}
              error={errors.amountPledged}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-sm font-medium">Is For All Courses?</label>
            <input type="checkbox" {...register("isForAllCourses")} />
          </div>
          <TextArea
            label="Scholarship Description"
            placeholder="Describe the scholarship"
            register={register("scholarshipDescription")}
            error={errors.scholarshipDescription}
          />
        </section>
        <Button type="submit" className="w-full text-white font-[700] mt-[-20px]">
          {create.isPending ? "Creating..." : "Create Partner"}
        </Button>
      </form>
    </Modal>
  )
}

export default CreatePartner
