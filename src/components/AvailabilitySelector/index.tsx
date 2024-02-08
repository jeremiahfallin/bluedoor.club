import { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import 'moment-timezone';
import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Select,
  Switch,
  Text,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import createTitle from '~/utils/createTitle';
import { trpc } from '~/utils/trpc';

// Setup the localizer by providing the moment Object
const defaultTZ = moment.tz.guess();

const ScheduleDay = ({
  name,
  weekday,
  disabled,
}: {
  name: string;
  weekday: string;
  disabled?: boolean;
}) => {
  const [value, setValue] = useState('');
  return (
    <Flex direction="row" align="center" gap={4}>
      {/* Label & switch container */}

      <Switch
        disabled={disabled}
        defaultChecked={false}
        checked={value === name}
        onChange={(isChecked) => {
          console.log(isChecked);
          if (isChecked) {
            setValue(name);
          } else {
            setValue(name);
          }
        }}
      />
      <Text fontSize={'lg'}>{weekday}</Text>
    </Flex>
  );
};

const TimeRangeField = ({
  className,
  value,
  onChange,
  disabled,
}: { className?: string; disabled?: boolean } & ControllerRenderProps) => {
  // this is a controlled component anyway given it uses LazySelect, so keep it RHF agnostic.
  return (
    <div className={classNames('flex flex-row gap-1', className)}>
      <LazySelect
        className="inline-block w-[100px]"
        isDisabled={disabled}
        value={value.start}
        max={value.end}
        onChange={(option) => {
          onChange({ ...value, start: new Date(option?.value as number) });
        }}
      />
      <span className="text-default mx-2 w-2 self-center"> - </span>
      <LazySelect
        className="inline-block w-[100px] rounded-md"
        isDisabled={disabled}
        value={value.end}
        min={value.start}
        onChange={(option) => {
          onChange({ ...value, end: new Date(option?.value as number) });
        }}
      />
    </div>
  );
};

const LazySelect = ({
  value,
  min,
  max,
  ...props
}: Omit<Props<IOption, false, GroupBase<IOption>>, 'value'> & {
  value: ConfigType;
  min?: ConfigType;
  max?: ConfigType;
}) => {
  // Lazy-loaded options, otherwise adding a field has a noticeable redraw delay.
  const { options, filter } = useOptions();

  useEffect(() => {
    filter({ current: value });
  }, [filter, value]);

  return (
    <Select
      options={options}
      onMenuOpen={() => {
        if (min) filter({ offset: min });
        if (max) filter({ limit: max });
      }}
      value={options.find(
        (option) => option.value === dayjs(value).toDate().valueOf(),
      )}
      onMenuClose={() => filter({ current: value })}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      {...props}
    />
  );
};

const AvailabilitySelector = ({
  availabilityRefetch,
  availability,
  name,
  seasonStart,
  seasonEnd,
  teams,
}: {
  availabilityRefetch: any;
  availability: any;
  name: string;
  seasonStart: Date;
  seasonEnd: Date;
  teams: any;
}) => {
  const [teamIndex, setTeamIndex] = useState(0);
  const [minTime, setMinTime] = useState(new Date(1972, 0, 1, 0, 0, 0, 0));
  const [maxTime, setMaxTime] = useState(new Date(1972, 0, 1, 23, 59, 59));
  const toast = useToast();

  const [timezone, setTimezone] = useState(defaultTZ);

  const availabilityMutation = trpc.availability.update.useMutation({
    onSuccess: () => {
      toast({
        title: 'Availability updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      availabilityRefetch();
    },
  });

  const teamIndexRef = useRef<any>(0);

  useEffect(() => {
    teamIndexRef.current = teamIndex;
  }, [teamIndex]);

  return (
    <>
      <Center>
        <Heading p={4}>Set your {name} availabiliy</Heading>
      </Center>
      <Flex p={4} gap={4}>
        <Select
          value={teamIndex}
          onChange={(e) => setTeamIndex(parseInt(e.target.value))}
        >
          {teams.map((team: any, index: number) => (
            <option key={team.id} value={index}>
              {team.name}
            </option>
          ))}
        </Select>
        <Select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
          {moment.tz.names().map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </Select>
      </Flex>
      <Box p={4}>
        <IconButton
          aria-label="Delete"
          icon={<DeleteIcon />}
          onClick={() => {
            const teamId = teams[teamIndexRef.current].id;
            if (teamId) {
              availabilityMutation.mutate({
                id: teamId,
                times: [],
              });
            }
          }}
        >
          Clear Availability
        </IconButton>
        <ScheduleDay name="Sunday" weekday="Sunday" disabled={false} />
        <ScheduleDay name="Monday" weekday="Monday" disabled={false} />
        <ScheduleDay name="Tuesday" weekday="Tuesday" disabled={false} />
        <ScheduleDay name="Wednesday" weekday="Wednesday" disabled={false} />
        <ScheduleDay name="Thursday" weekday="Thursday" disabled={false} />
        <ScheduleDay name="Friday" weekday="Friday" disabled={false} />
        <ScheduleDay name="Saturday" weekday="Saturday" disabled={false} />
      </Box>
      <Box p={2} overflowY="auto" h="100%"></Box>
    </>
  );
};

export default AvailabilitySelector;
