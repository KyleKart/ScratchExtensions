class DiscordOpen {
    getInfo() {
        return {
            id: 'discordopen',
            name: 'Discord',
            blocks: [
                {
                    opcode: 'openDiscord',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Open Discord [option] [input1] [input2]',
                    arguments: {
                        option: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "Home",
                            menu: "menuOptions"
                        },
                        input1: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: ""
                        },
                        input2: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                }
            ],
            menus: {
                menuOptions: this.generateMenuOptions()
            }
        };
    }

    generateMenuOptions() {
        const menuOptions = {
            acceptReporters: true,
            items: [
                "Home",
                "Friends",
                "Nitro",
                "Shop",
                "Message Requests",
                "Family Centre",
                "Apps",
                "Discovery - Guilds",
                "Gift",
                "Gift (with login screen)",
                "New Server",
                "Server Invite",
                "Server Invite (with login screen)",
                "Developer Portal",
                "Settings",
                "Hypesquad",
                "Changelogs",
                "Experiments",
                "Developer Options",
                "Hotspot Options",
                "Dismissible Content Options",
                "Guild Settings",
                "Overview",
                "Roles",
                "Emoji",
                "Stickers",
                "Widget",
                "Server Template",
                "Soundboard",
                "Custom Invite Link",
                "Apps - Integrations",
                "Apps - App Directory",
                "Moderation - Safety Setup",
                "Moderation - Audit Log",
                "Moderation - Bans",
                "Community - Overview",
                "Community - Onboarding",
                "Community - Server Insights",
                "Community - Partner Programme",
                "Community - Discovery",
                "Community - Server Web Page",
                "Community - Welcome Screen",
                "Monetization - Server Subscriptions",
                "Server Boost Status",
                "User Management - Members",
                "User Management - Invites",
                "Delete",
                "User Profile",
                "DM Channel",
                "DM Message",
                "Favorites",
                "Favorites Channel",
                "Guild",
                "Guild Channel",
                "Guild Browse Channels",
                "Guild Customize",
                "Guild Server Guide Channel",
                "Guild Event",
                "Guild Member Safety",
                "Guild Membership Screening",
                "Guild Role Subscriptions",
                "Hub Membership Screening",
                "Library",
                "Library Inventory",
                "Library Item Actions",
                "Account - Login",
                "Account - Register",
                "Account - Reset",
                "Account - Restore",
                "Events - Snowsgiving",
                "Events - 8th Birthday"
                // Add more options as needed
            ]
        };

        return menuOptions;
    }

    getDiscordUrl(option, input1, input2) {
        const urlMap = {
            "Home": "discord://-/",
            "Friends": "discord://-/channels/@me/",
            "Nitro": "discord://-/store",
            "Shop": "discord://-/shop",
            "Message Requests": "discord://-/message-requests",
            "Family Centre": "discord://-/family-center",
            "Apps": "discord://-/apps",
            "Discovery - Guilds": "discord://-/guild-discovery",
            "Gift": "discord://-/gifts/" + input1,
            "Gift (with login screen)": "discord://-/gifts/" + input1 + "/login",
            "New Server": "discord://-/guilds/create",
            "Server Invite": "discord://-/invite/" + input1,
            "Server Invite (with login screen)": "discord://-/invite/" + input1 + "/login",
            "Developer Portal": "discord://-/developer",
            "Settings": "discord://-/settings/" + input1,
            "Hypesquad": "discord://-/hypesquad-online",
            "Changelogs": "discord://-/changelogs",
            "Experiments": "discord://-/experiments",
            "Developer Options": "discord://-/developer-options",
            "Hotspot Options": "discord://-/hotspot-options",
            "Dismissible Content Options": "discord://-/dismissible-content-options",
            "Guild Settings": "discord://-/guilds/" + input1 + "/settings",
            "Overview": "discord://-/overview",
            "Roles": "discord://-/roles",
            "Emoji": "discord://-/emoij",
            "Stickers": "discord://-/stickers",
            "Widget": "discord://-/widget",
            "Server Template": "discord://-/guild-templates",
            "Soundboard": "discord://-/soundboard",
            "Custom Invite Link": "discord://-/vanity-url",
            "Apps - Integrations": "discord://-/integrations",
            "Apps - App Directory": "discord://-/app-directory",
            "Moderation - Safety Setup": "discord://-/safety",
            "Moderation - Audit Log": "discord://-/audit-log",
            "Moderation - Bans": "discord://-/bans",
            "Community - Overview": "discord://-/community",
            "Community - Onboarding": "discord://-/onboarding",
            "Community - Server Insights": "discord://-/analytics",
            "Community - Partner Programme": "discord://-/partner",
            "Community - Discovery": "discord://-/discovery",
            "Community - Server Web Page": "discord://-/discovery-landing-page",
            "Community - Welcome Screen": "discord://-/community-welcome",
            "Monetization - Server Subscriptions": "discord://-/role-subscriptions",
            "Server Boost Status": "discord://-/guild-premium",
            "User Management - Members": "discord://-/members",
            "User Management - Invites": "discord://-/instant-invites",
            "Delete": "discord://-/delete",
            "User Profile": "discord://-/users/" + input1,
            "DM Channel": "discord://-/channels/@me/" + input1,
            "DM Message": "discord://-/channels/@me/" + input1 + "/" + input2,
            "Favorites": "discord://-/channels/@favorites",
            "Favorites Channel": "discord://-/channels/@favorites/" + input1,
            "Guild": "discord://-/channels/" + input1,
            "Guild Channel": "discord://-/channels/" + input1 + "/" + input2,
            "Guild Browse Channels": "discord://channels/" + input1 + "/channel-browser",
            "Guild Customize": "discord://channels/" + input1 + "/customize-community",
            "Guild Server Guide Channel": "discord://-/channels/" + input1 + "/@home",
            "Guild Event": "discord://-/events/" + input1 + "/" + input2,
            "Guild Member Safety": "discord://-/channels/" + input1 + "/member-safety",
            "Guild Membership Screening": "discord://-/member-verification/" + input1,
            "Guild Role Subscriptions": "discord://-/channels/" + input1 + "/role-subscriptions",
            "Hub Membership Screening": "discord://-/member-verification-for-hub/" + input1,
            "Library": "discord://-/library/",
            "Library Inventory": "discord://-/library/inventory",
            "Library Item Actions": "discord://-/library/" + input1 + "/" + input2,
            "Account - Login": "discord://-/login",
            "Account - Register": "discord://-/register",
            "Account - Reset": "discord://-/reset",
            "Account - Restore": "discord://-/restore",
            "Events - Snowsgiving": "discord://-/snowsgiving",
            "Events - 8th Birthday": "discord://-/activities"
            // Add more mappings as needed
        };

        let url = urlMap[option] || "";

        return url;
    }

    openDiscord(args) {
        const option = args.option;
        const input1 = args.input1;
        const input2 = args.input2;
        const url = this.getDiscordUrl(option, input1, input2);

        if (url) {
            const element = document.createElement("a");
            element.href = url;
            element.target = "_blank";
            element.style.display = "none";
            document.body.appendChild(element);
            element.click();
            element.remove();
        } else {
            console.error("Invalid option selected.");
        }
    }
}

Scratch.extensions.register(new DiscordOpen());
