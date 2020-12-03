import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import projectContext from "../../context/projects/projectContext";
import alertContext from "../../context/alerts/alertContext";
import Project from "./Project";
const ListProject = () => {
  const projectsContext = useContext(projectContext);
  const { msg, projects, getProjects } = projectsContext;

  const alertsContext = useContext(alertContext);
  const { alert, showAlert } = alertsContext;

  useEffect(() => {
    if (msg) {
      showAlert(msg.msg, msg.category);
    }
    getProjects();
    //eslint-disable-next-line
  }, [msg]);
  if (projects.length === 0)
    return <p>Don´t have a projects, do you like start one?</p>;
  return (
    <ul className="listado-proyectos">
      {alert ? (
        <div className={`alert ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <TransitionGroup>
        {projects.map((project) => (
          <CSSTransition key={project._id} classNames="proyecto" timeout={200}>
            <Project project={project} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};
export default ListProject;
