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

export {
    createJob
}