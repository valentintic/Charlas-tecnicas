import { useParams } from "react-router-dom";

const withParams = (Component) => (props) => {
  const params = useParams();
  return <Component {...props} params={params} />;
};

export default withParams;
