import Job from "../models/jobs.models.js"

const createJob = async (req, res) => {
    // console.log(req.body);

    const { title, description, location, experienceLevel, salary, workMode, deadline, isActive } = req.body;
    // const deadlineValue = new Date(deadline)

    const jobObject = {
        recruiterId: req.user._id,
        title,
        description,
        location,
        experienceLevel,
        salary,
        workMode,
        deadline,
        isActive
    }

    try {
        if (req.user.userType === "recruiter") {
            const job = await Job.create(jobObject);
            return res.status(201).json({
                message: "Job created successfully!",
                job: job
            })
        }
        return res.status(409).json({
            message: "Only Recruiter can create Jobs "
        })

    } catch (error) {
        return res.status(401).json({
            message: "Error while creating job!",
            error: error.message
        })
    }



}

const updateJob = async (req, res) => {
    const allowedFields = [
        "title",
        "description",
        "location",
        "experienceLevel",
        "salary",
        "workMode",
        "deadline",
        "isActive"
    ]

    const fieldsToUpdate = {};
    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            fieldsToUpdate[field] = req.body[field]
        }
    }
    try {
        if (req.user.userType !== "recruiter") {
            return res.status(409).json({
                message: "Only Recruiter is Allowed to make changes in job"
            })
        }
        const updatedJob = await Job.findOneAndUpdate(
            {
                recruiterId: req.user._id
            },
            {
                $set: fieldsToUpdate
            },
            {
                returnDocument: "after"
            }
        )

        if (!updatedJob) {
            return res.status(404).json({
                message: `There is no job posted by you!`

            })
        }

        return res.status(201).json({
            message: "Job Profile Updated Sucessfully!",
            job: updatedJob
        })


    } catch (error) {
        return res.status(402).json({
            message: "Error While Upadting Job Details",
            error: error.message
        })

    }


}

export {
    createJob,
    updateJob
}