export const prepareProjectsData = (stateProjects) => {
  const result = {
    staffed: [],
    open: [],
    closed: []
  };

  for(let stateProject of stateProjects) {
    const project = Object.assign({}, stateProject);
    project.staffed_days = project.staffings.reduce((acc, val) => acc + val.days, 0);

    if(project.closed) {
      result.closed.push(project);
    } else {
      if(project.staffed_days >= project.estimation_days) {
        result.staffed.push(project)
      } else {
        result.open.push(project)
      }
    }
  }

  return result;
};
