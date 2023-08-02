import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { Controller, useForm } from 'react-hook-form';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import Event from './Event';
import { Box } from '@chakra-ui/react';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const { control, handleSubmit, watch, setValue, formState } = useForm({
    defaultValues: {
      options: [],
      duration: 30,
      timeZone: '',
      navigationDate: new Date().toISOString(),
    },
    resolver: (values) => {
      return {
        values,
        errors:
          values.options.length === 0
            ? {
                options: true,
              }
            : {},
      };
    },
  });
  const watchOptions = watch('options');

  const components = {
    agenda: {
      event: () => <></>,
      time: () => <></>,
      date: () => <></>,
    },
    dateCellWrapper: () => null,
    timeGutterHeader: () => null,
    resourceHeader: () => null,
    event: ({ event }) => <Event title={event.title} />,
    toolbar: (props) => {
      console.log(props);
      return null;
    },
    header: (props) => {
      console.log(props);
      return null;
    },
    week: {
      header: ({ date, label, localizer }) => {
        return (
          <Box w="100%" h="100%" bg="gray.900">
            {label}
          </Box>
        );
      },
    },
  };

  useEffect(() => {
    setValue('options', events);
  }, [events]);
  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setEvents],
  );

  return (
    <DnDCalendar
      step={15}
      components={components}
      localizer={localizer}
      defaultDate={moment().toDate()}
      defaultView={'week'}
      max={moment('2022-10-10T16:00:00').toDate()}
      min={moment('2022-10-10T08:00:00').toDate()}
      events={events}
      onEventResize={resizeEvent}
      selectable={true}
      onSelectSlot={(slotInfo) => {
        setEvents((prevEvents) => {
          prevEvents.push({
            start: slotInfo.start,
            end: slotInfo.end,
            title: 'Available',
          });
          return [...prevEvents];
        });
      }}
      onSelectEvent={(event) => {
        setEvents((prevEvents) => {
          const filtered = prevEvents.filter((ev) => ev.id !== event.id);
          return [...filtered];
        });
      }}
      views={['week']}
    />
  );
};

export default Calendar;
