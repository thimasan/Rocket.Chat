import { Margins } from '@rocket.chat/fuselage';
import { Meta, Story } from '@storybook/react';
import faker from 'faker';
import React from 'react';

import { useRestApiGet } from '../../../../../../.storybook/hooks/useRestApiGet';
import ChannelsTab from './ChannelsTab';

export default {
	title: 'admin/engagementDashboard/ChannelsTab',
	component: ChannelsTab,
	decorators: [
		(fn) => {
			useRestApiGet('/v1/engagement-dashboard/channels/list', async (params) => {
				faker.seed(params.offset * params.count);

				const total = faker.datatype.number({ min: 100 });

				return {
					channels: Array.from({ length: total }, () => {
						const t = faker.random.arrayElement(['c', 'd', 'p'] as const);
						const messages = faker.datatype.number({ min: 10, max: 1000 });

						return {
							room: {
								_id: faker.datatype.uuid(),
								name:
									t === 'c' || t === 'p'
										? faker.helpers.slugify(faker.name.jobArea()).toLowerCase()
										: undefined,
								ts: faker.date.past(5).toISOString(),
								t,
								_updatedAt: faker.date.between(params.start, params.end).toISOString(),
								usernames:
									t === 'd'
										? Array.from({ length: faker.datatype.number({ min: 2, max: 3 }) }, () =>
												faker.internet.userName().toLowerCase(),
										  )
										: undefined,
							},
							messages,
							lastWeekMessages: messages,
							diffFromLastWeek: faker.datatype.number({ min: -50, max: 50 }),
						};
					}).slice(params.offset, params.offset + params.count),
					total,
					offset: params.offset,
					count: params.count,
				};
			});

			return <Margins children={fn()} all='x24' />;
		},
	],
} as Meta;

export const Default: Story = () => <ChannelsTab />;
Default.storyName = 'ChannelsTab';
