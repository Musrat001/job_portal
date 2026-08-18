const createJob = async (req, res) => {
    console.log(req.body);

    const { title, description, location, experienceLevel, salary, workMode, deadline, isActive } = req.body;

    const jobObject = {
        title,
        description,
        location,
        experienceLevel,
        salary,
        workMode,
        deadline,
        isActive
    }



}