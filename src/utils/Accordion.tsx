import { ReactNode, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';

interface AccordionProp {
  title: string;
  content: ReactNode;
}

const Accordion = ({ title, content }: AccordionProp) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((current) => !current);

  return (
    <div
      className="my-2 sm:my-4 md:my-4 shadow-sm cursor-pointer bg-white border border-neutral-06 rounded-lg"
      onClick={toggleExpanded}
    >
      <div className="px-6 text-left items-center py-4 select-none flex justify-between flex-row">
        <h5 className="flex-1 font-semibold">{title}</h5>
        <div className="flex-none pl-2">
          <FaAngleDown
            className={`transition-transform duration-500 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>
      <div
        className={`px-6 pt-0 overflow-hidden transition-[max-height] duration-500 ease-in ${
          expanded ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="pb-4 text-left">{content}</div>
      </div>
    </div>
  );
};

export default Accordion;
