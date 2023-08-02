import { useCallback, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { Box, Center, Heading, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Toolbar from './Toolbar';
import createTitle from '~/utils/createTitle';

const DragAndDropCalendar = withDragAndDrop(Calendar);
// Setup the localizer by providing the moment Object
const defaultTZ = moment.tz.guess();

const AvailabilitySelector = ({
  availabilityId,
  name,
  seasonStart,
  seasonEnd,
  initialEvents,
}: {
  availabilityId: string;
  name: string;
  seasonStart: Date;
  seasonEnd: Date;
  initialEvents: any;
}) => {
  const [events, setEvents] = useState(initialEvents) as any;
  const [timezone, setTimezone] = useState(defaultTZ);

  const newEvent = useCallback(
    (event: any) => {
      setEvents((prev: any) => {
        const idList = prev.map((item: any) => item.id);
        const newId = Math.max(...idList, 0) + 1;

        let newStart = event.start;
        let newEnd = event.end;

        for (let i = 0; i < prev.length; i++) {
          const isStartBetween = localizer.inRange(
            event.start,
            prev[i].start,
            prev[i].end,
            'milliseconds',
          );
          const isEndBetween = localizer.inRange(
            event.end,
            prev[i].start,
            prev[i].end,
            'milliseconds',
          );
          if (isStartBetween || isEndBetween) {
            newStart = localizer.min(event.start, prev[i].start);
            newEnd = localizer.max(event.end, prev[i].end);
            prev.splice(i, 1);
          }
        }
        event.title = createTitle({ start: newStart, end: newEnd });

        return [...prev, { ...event, id: newId, start: newStart, end: newEnd }];
      });
    },
    [setEvents],
  );

  const eventPropGetter = useCallback(
    (event: any) => ({
      ...(event.isDraggable
        ? { className: 'isDraggable' }
        : { className: 'nonDraggable' }),
    }),
    [],
  );

  const handleEvent = useCallback(
    ({ event, start, end }: any) => {
      setEvents((prev: any) => {
        // Find and remove the event that's being resized
        const existing = prev.find((ev: any) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev: any) => ev.id !== event.id);

        let newStart = start;
        let newEnd = end;

        for (let i = 0; i < filtered.length; i++) {
          const isStartBetween = localizer.inRange(
            start,
            filtered[i].start,
            filtered[i].end,
            'milliseconds',
          );
          const isEndBetween = localizer.inRange(
            end,
            filtered[i].start,
            filtered[i].end,
            'milliseconds',
          );
          if (isStartBetween || isEndBetween) {
            newStart = localizer.min(start, filtered[i].start);
            newEnd = localizer.max(end, filtered[i].end);
            filtered.splice(i, 1);
          }
        }
        existing.title = createTitle({ start: newStart, end: newEnd });

        return [...filtered, { ...existing, start: newStart, end: newEnd }];
      });
    },
    [setEvents],
  );

  const removeEvent = useCallback(
    (event: any) => {
      console.log(event);
      setEvents((prev: any) => {
        return prev.filter((ev: any) => ev.id !== event.id);
      });
    },
    [setEvents],
  );

  const { defaultDate, getNow, localizer, myEvents, scrollToTime } =
    useMemo(() => {
      moment.tz.setDefault(timezone);
      return {
        defaultDate: moment(seasonStart).toDate(),
        getNow: () => moment().toDate(),
        localizer: momentLocalizer(moment),
        myEvents: [...events],
        scrollToTime: moment().toDate(),
      };
    }, [timezone, seasonStart, events]);

  console.log('myEvents', myEvents);

  return (
    <>
      <Center>
        <Heading p={4}>Set your {name} availabiliy</Heading>
      </Center>
      <Box p={2} overflowY="auto" h="100%">
        <DragAndDropCalendar
          localizer={localizer}
          components={{
            event: (event) => (
              <Box>
                <Box>
                  <Center py={1}>Available</Center>
                  <Center>{event.title}</Center>
                </Box>
                <IconButton
                  aria-label="Delete"
                  position="absolute"
                  bottom={2}
                  right={2}
                  size="xs"
                  icon={<DeleteIcon />}
                  onClick={() => removeEvent(event.event)}
                />
              </Box>
            ),
            toolbar: (props) => (
              <Toolbar
                events={myEvents}
                {...{
                  ...props,
                  seasonStart,
                  seasonEnd,
                  timezone,
                  setTimezone,
                  availabilityId,
                  defaultTZ,
                }}
              />
            ),
          }}
          defaultDate={defaultDate}
          defaultView="week"
          draggableAccessor={() => true}
          eventPropGetter={eventPropGetter}
          events={myEvents}
          getNow={getNow}
          onEventDrop={handleEvent}
          onEventResize={handleEvent}
          onSelectSlot={newEvent}
          resizable
          scrollToTime={scrollToTime}
          selectable
          step={15}
          timeslots={4}
          views={{ week: true }}
        />
      </Box>
    </>
  );
};

export default AvailabilitySelector;
