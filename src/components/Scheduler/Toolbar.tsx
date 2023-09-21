import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Select,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { ArrowLeft, ArrowRight, Target } from 'react-feather';
import moment from 'moment';
import 'moment-timezone';

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
      defaultValue={defaultTZ}
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

function TeamSelect({ teams, setTeamIndex, teamIndex }: any) {
  const onChange = ({ target: { value } }: any) => {
    const newIndex = parseInt(value);
    setTeamIndex(newIndex);
  };
  return (
    <Select
      className="form-control"
      style={{ width: 200, display: 'inline-block' }}
      defaultValue={teamIndex}
      onChange={onChange}
    >
      {teams.map((c: any, idx: any) => (
        <option key={c.id} value={idx}>
          {c.name}
        </option>
      ))}
    </Select>
  );
}

function TimeSelect({ setTime, initialValue }: any) {
  const onChange = ({ target: { value } }: any) => {
    if (value === '24') {
      const date = new Date(1972, 0, 1, 23, 59, 59);
      setTime(date);
      return;
    }
    const date = new Date(1972, 0, 1, value, 0, 0);
    setTime(date);
  };

  return (
    <>
      <Select
        className="form-control"
        style={{ width: 200, display: 'inline-block' }}
        defaultValue={initialValue}
        onChange={onChange}
      >
        {Array.from({ length: 25 }, (_, i) => (
          <option key={i} value={i}>
            {i}:00
          </option>
        ))}
      </Select>
    </>
  );
}

const FlexSelect = ({ label, children }: any) => (
  <Flex gap={2} justify={'center'} align="center">
    <Text w="100%">{label}:</Text>
    {children}
  </Flex>
);

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
  handleUpdate,
  defaultTZ,
  teams,
  setTeamIndex,
  teamIndex,
  setMaxTime,
  setMinTime,
}: any) {
  const { messages } = localizer;

  return (
    <Box className="rbc-toolbar">
      <Flex gap={4}>
        <Flex direction="column" gap={2}>
          <FlexSelect label={'Timezone'}>
            <TimezoneSelect {...{ timezone, setTimezone, defaultTZ }} />
          </FlexSelect>
          <FlexSelect label={'Team'}>
            <TeamSelect {...{ teams, setTeamIndex, teamIndex }} />
          </FlexSelect>
        </Flex>
        <Flex direction="column" gap={2}>
          <FlexSelect label={'Start time'}>
            <TimeSelect setTime={setMinTime} initialValue={0} />
          </FlexSelect>
          <FlexSelect label={'End time'}>
            <TimeSelect setTime={setMaxTime} initialValue={24} />
          </FlexSelect>
        </Flex>
      </Flex>

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
            handleUpdate();
          }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
}
