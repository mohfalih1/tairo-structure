import pages from './navigation'

export default defineAppConfig({

	tairo: {
		title: 'Elixir',

		collapse: {
			toolbar: {
				enabled: true,
				showTitle: true,
				showNavBurger: true,
				tools: [
					{
						component: 'DemoThemeToggle',
					},
					{
						component: 'DemoToolbarNotifications',
					},
					{
						component: 'DemoToolbarAccountMenu',
					},
				],
			},
			circularMenu: {
				enabled: false
			},
			navigation: {
				enabled: true,
				footer: {
					component: 'DemoCollapseNavigationFooter',
				},
				items: pages as any,
			},
		},
	},
})
