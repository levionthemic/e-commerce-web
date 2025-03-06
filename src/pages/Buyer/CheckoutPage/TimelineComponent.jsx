import {
  Timeline,
  TimelineContent,
  // TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle
} from '~/components/ui/timeline'

export default function TimelineComponent({ items }) {
  return (
    (<Timeline defaultValue={3} orientation="horizontal">
      {items.map((item) => (
        <TimelineItem key={item.id} step={item.id}>
          <TimelineHeader>
            <TimelineSeparator className='bg-mainColor1-400 left-5 top-5' />
            {/* <TimelineDate>{item.date}</TimelineDate> */}
            <TimelineTitle className='text-mainColor1-800 font-bold text-md'>{item.title}</TimelineTitle>
            <TimelineIndicator className='border-none flex items-center justify-center w-fit h-fit'>
              <div className='rounded-full w-7 h-7 flex items-center justify-center text-white bg-mainColor1-600 text-sm'>{item.id}</div>
            </TimelineIndicator>
          </TimelineHeader>
          <TimelineContent>{item.description}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>)
  )
}
