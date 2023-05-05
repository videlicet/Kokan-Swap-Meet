import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import './Tooltip.css';

interface tooltip {
    content: string
}

const TooltipInfo: React.FC<tooltip> = (props: tooltip) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
            <InfoCircledIcon />
        </Tooltip.Trigger>
        <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent" sideOffset={5}>
                {props.content}
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipInfo;
