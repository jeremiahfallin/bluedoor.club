import {
  Box,
  Link as ChakraLink,
  Flex,
  Text,
  IconButton,
  HStack,
  Spacer,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  Divider,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/next-js';
import { useSession, signIn, signOut } from 'next-auth/react';
import { trpc } from '../utils/trpc';
import { Fragment } from 'react';

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const { data: session } = useSession();
  const { data: games } = trpc.game.list.useQuery();

  const navItems = [
    {
      label: 'Home',
      href: '/',
    },
    ...(games?.map((game) => ({
      label: game.name,
      href: `/games/${game.slug}`,
    })) || []),
  ];

  const navItemsRight = [
    {
      label: 'Admin',
      href: '/admin',
      criteria: session?.user?.role === 'ADMIN',
    },
    {
      label: 'Profile',
      href: '/profile',
      criteria: session,
    },
    {
      label: 'Sign In',
      onClick: () => signIn(),
      criteria: !session,
    },
    {
      label: 'Sign Out',
      onClick: () => signOut(),
      criteria: session,
    },
  ];

  return (
    <Box w="100%">
      <Flex as="header" bg="blue.500" px={2} py={1}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          display={{ base: 'flex', md: 'none' }}
          align={'center'}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex display={{ base: 'none', md: 'flex' }} w="100%">
          <DesktopNav navItemsLeft={navItems} navItemsRight={navItemsRight} />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navItemsTop={navItems} navItemsBottom={navItemsRight} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({
  navItemsLeft,
  navItemsRight,
}: {
  navItemsLeft?: any;
  navItemsRight?: any | null;
}) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Flex w="100%">
      <HStack>
        {navItemsLeft.map((navItem: any) => (
          <Box key={navItem.label}>
            <Link
              p={2}
              href={navItem.href}
              fontSize={'sm'}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}
            >
              {navItem.label}
            </Link>
          </Box>
        ))}
      </HStack>
      <Spacer />
      <HStack>
        {navItemsRight?.flatMap((navItem: any) => {
          if (navItem.criteria) {
            return (
              <Fragment key={navItem.label}>
                {navItem.onClick ? (
                  <ChakraLink
                    onClick={navItem.onClick}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                      textDecoration: 'none',
                      color: linkHoverColor,
                    }}
                  >
                    {navItem.label}
                  </ChakraLink>
                ) : (
                  <Link
                    href={navItem.href}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                      textDecoration: 'none',
                      color: linkHoverColor,
                    }}
                  >
                    {navItem.label}
                  </Link>
                )}
              </Fragment>
            );
          }
          return [];
        })}
      </HStack>
    </Flex>
  );
};

const MobileNav = ({
  navItemsTop,
  navItemsBottom,
}: {
  navItemsTop: any;
  navItemsBottom: any;
}) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {navItemsTop.map((navItem: any) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Divider colorScheme="blue" />
      {navItemsBottom?.flatMap((navItem: any) => {
        if (navItem.criteria) {
          return (
            <Fragment key={navItem.label}>
              {navItem.onClick ? (
                <MobileNavItem key={navItem.label} {...navItem} />
              ) : (
                <MobileNavItem key={navItem.label} {...navItem} />
              )}
            </Fragment>
          );
        }
        return [];
      })}
      <Divider />
    </Stack>
  );
};

const MobileNavItem = ({ label, href, onClick }: any) => {
  return (
    <Flex
      py={2}
      as={Link}
      href={href ?? '#'}
      onClick={onClick}
      justify={'space-between'}
      align={'center'}
      _hover={{
        textDecoration: 'none',
      }}
    >
      <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
        {label}
      </Text>
    </Flex>
  );
};
