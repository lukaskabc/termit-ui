import React from "react";
import Term, { TermInfo } from "../../../model/Term";
import TermItState from "../../../model/TermItState";
import { useSelector } from "react-redux";
import { createTermNonTerminalStateMatcher } from "../TermTreeSelectHelper";

const IfNotInTerminalState: React.FC<{ term: Term | TermInfo }> = ({
  term,
  children,
}) => {
  const states = useSelector((state: TermItState) => state.states);
  return createTermNonTerminalStateMatcher(states)(term) ? (
    <>{children}</>
  ) : null;
};

export default IfNotInTerminalState;
