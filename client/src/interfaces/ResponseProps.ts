import { Metrics } from "./Metrics";
import { Page } from "./Page";
import { Todo } from "./Todo";

export interface ResponseProps {
  pages: Page;
  content: Todo[];
  metrics: Metrics;
}
