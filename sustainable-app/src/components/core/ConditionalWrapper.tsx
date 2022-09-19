import React, {ReactNode} from 'react';

interface ConditionalWrapperProps {
  condition: any;
  wrapper: (innerNode: ReactNode, condition: any) => any;
  children: JSX.Element
}

export const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({
  condition,
  wrapper,
  children,
}) => (condition ? wrapper(children, condition) : children);
