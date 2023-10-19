import { createIcon } from '@chakra-ui/icons';

// using `path`
export const AddIcon = createIcon({
  displayName: 'AddIcon',
  viewBox: '0 0 49 49',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none">
      <path
        d="M38.9002 22.1002H26.9002V10.1002C26.9002 8.7802 25.8202 7.7002 24.5002 7.7002C23.1802 7.7002 22.1002 8.7802 22.1002 10.1002V22.1002H10.1002C8.7802 22.1002 7.7002 23.1802 7.7002 24.5002C7.7002 25.8202 8.7802 26.9002 10.1002 26.9002H22.1002V38.9002C22.1002 40.2202 23.1802 41.3002 24.5002 41.3002C25.8202 41.3002 26.9002 40.2202 26.9002 38.9002V26.9002H38.9002C40.2202 26.9002 41.3002 25.8202 41.3002 24.5002C41.3002 23.1802 40.2202 22.1002 38.9002 22.1002Z"
        fill="#ABA89D"
      />
    </g>
  )
});
