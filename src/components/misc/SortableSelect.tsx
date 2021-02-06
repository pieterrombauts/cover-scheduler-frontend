import React from 'react';
import Select, { components, MultiValueProps } from 'react-select';
import {SortableContainer, SortableElement, SortableHandle, SortableElementProps} from 'react-sortable-hoc';

export const arrayMove = (array: any[], from: number, to: number) => {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

// IN ORDER FOR THIS TO WORK, YOU NEED TO ADD index: number TO MULTIVALUEPROPS
export const SortableMultiValue = SortableElement((props: MultiValueProps<any>) => {
  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }
  const innerProps = { ...props.innerProps, onMouseDown };
  return <components.MultiValue {...props} innerProps={innerProps} />;
});

export const SortableMultiValueLabel = SortableHandle((props: any) => (
  <components.MultiValueLabel {...props} />
))

export default SortableContainer(Select);