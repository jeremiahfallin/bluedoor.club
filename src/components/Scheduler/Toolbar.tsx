import { Box, Button, Heading, IconButton, Select } from '@chakra-ui/react';
import { ArrowLeft, ArrowRight, Target } from 'react-feather';
import moment from 'moment';
import 'moment-timezone';
import { trpc } from '~/utils/trpc';

const navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
};

const allZones = moment.tz.names().filter((z) => z.includes('America'));

function TimezoneSelect({
  timezone,
  setTimezone,
  defaultTZ = moment.tz.guess(),
}: any) {
  const onChange = ({ target: { value } }: any) =>
    setTimezone(value ? value : defaultTZ);
  return (
    <Select
      className="form-control"
      style={{ width: 200, display: 'inline-block' }}
      value={timezone}
      onChange={onChange}
    >
      {allZones.map((c, idx) => (
        <option key={idx} value={c}>
          {c}
        </option>
      ))}
    </Select>
  );
}

export default function Toolbar({
  // date, // available, but not used here
  label,
  localizer,
  onNavigate,
  date,
  seasonStart,
  seasonEnd,
  timezone,
  setTimezone,
  availabilityId,
  defaultTZ,
  events,
}: any) {
  const availabilityMutation = trpc.availability.update.useMutation();
  const { messages } = localizer;

  return (
    <Box className="rbc-toolbar">
      <Box>
        <TimezoneSelect {...{ timezone, setTimezone, defaultTZ }} />
      </Box>

      <Heading as="h3" size="lg" className="rbc-toolbar-label">
        {label}
      </Heading>

      <Box>
        <IconButton
          type="button"
          icon={<ArrowLeft />}
          onClick={() => onNavigate(navigate.PREVIOUS)}
          aria-label={messages.previous}
          isDisabled={localizer.gte(new Date(date), new Date(seasonStart))}
          variant="solid"
          colorScheme="blue"
        />
        <IconButton
          type="button"
          icon={<Target />}
          onClick={() => onNavigate(navigate.DATE, new Date(seasonStart))}
          aria-label={messages.today}
          variant="solid"
          colorScheme="blue"
        />
        <IconButton
          type="button"
          icon={<ArrowRight />}
          onClick={() => onNavigate(navigate.NEXT)}
          aria-label={messages.next}
          isDisabled={localizer.gte(new Date(seasonEnd), new Date(date))}
          variant="solid"
          colorScheme="blue"
        />
      </Box>

      <Box className="rbc-btn-group" pl={2}>
        <Button
          type="button"
          onClick={() => {
            availabilityMutation.mutate({
              id: availabilityId,
              times: events.map((e: any) => {
                return {
                  startTime: moment(e.start).toDate(),
                  endTime: moment(e.end).toDate(),
                };
              }),
            });
          }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
}
