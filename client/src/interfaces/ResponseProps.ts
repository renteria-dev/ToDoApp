import Metrics from "./Metrics";
import Page from "./Page";
import Todo from "./Todo";

interface ResponseProps {
  pages: Page;
  todos: Todo[];
  metrics: Metrics;
}

export default ResponseProps;
