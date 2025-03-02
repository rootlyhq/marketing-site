---
title: Configuring Tech Radar
publishedDate: '2021-08-25T15:00:00.0Z'
description: Configuring Tech Radar to use your data source
humanName: Tech Radar
logoImage: '../../../assets/logos/tech-radar/radar.png'
integrationType: OSS plugin
---

## Introduction

If you want to use Tech Radar on your Roadie instance you can add it as a page using the steps defined in [this guide](/docs/details/updating-the-ui/#updating-the-sidebar).


## Step 1: Configuration

The configuration for Tech Radar data can be defined at the following url:
```text
https://<tenant-name>.roadie.so/administration/settings/tech-radar
```

![Tech Radar Settings](./radar-settings.png)

Roadie currently supports fetching tech radar data directly from GitHub.  

In the configuration you need to tell your Roadie instance the repository name, organization/user and path to the actual 
tech radar data file within the repository. The ID field is used to distinguish between sources if multiple sources are 
configured and can have any value though it may help for it to be meaningful.

Both CSV and JSON data files are supported, as long as they conform to the specified format. 

## Step 2: Adding the tech radar page

The tech radar plugin provides a `TechRadarPage` page component which can be added to the sidebar. For more details on adding pages to the
UI read [this guide](/docs/details/updating-the-ui/#updating-the-sidebar). 

If you're adding a second tech radar you'll need to pass the `id` of the tech radar source in step one as a prop. To edit props
click the edit pencil icon and pass your props as JSON and click the save icon. Then click the "Add" button to save the page.   

![Tech Radar Page](./edit-props.png)

## Data formats

Roadie Tech Radar supports two different data types, JSON and CSV. JSON gives user more control over the specified radar configuration. CSV provides a somewhat simpler but more restricted option.
Tech radar has the following terminology:

* Entries: Technologies you wish to place on your radar
* Quadrants: Broad catagories that entries fit into e.g. Languages, Platforms, Techniques, Tools.
* Rings: Represent a scale by which you compare entries. E.g. Adopt, Trial, Assess, Hold


#### Valid values

Both JSON and CSV format use similar set of values. Mandatory values and their types are as follows:
```
title: text to display as the entry title
quadrant: reference to quadrant id
ringId/ring: reference to ring id. ringId is used for JSON format, ring for CSV
```

For more information you can also define more descriptive, optional values:


```
description: longer description text for the entry
url: link for more information about the entry
moved: number, where negative value indicates movement down in the radar, 0 indicates that the entry has not moved, and a positive value indicates movement upwards in the radar.
```

### JSON

With JSON format you can set up Tech Radar rings and quadrants as well as the data. An example JSON file would look like this:

```json
{
  "rings": [
    {
      "id": "use",
      "name": "USE",
      "color": "#93c47d"
    }
  ],
  "quadrants": [
    {
      "id": "languages",
      "name": "Languages"
    }
  ],
  "entries": [
    {
      "timeline": [
        {
          "moved": 0,
          "ringId": "use",
          "date": "2020-08-06T00:00:00.000Z",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        }
      ],
      "url": "#",
      "key": "javascript",
      "id": "javascript",
      "title": "JavaScript",
      "quadrant": "languages"
    }
  ]
}
```

In the rings section you can define names for rings in the tech radar and their corresponding colors. For quadrants naming of them is modifiable. Note that both rings and quadrants contain an `id` field which should be matched in the entries themselves to get them positioned in the correct location within the tech radar.    

In the entries section an individual entry should contain values for `title`, `quadrant` and `timeline`. Timeline should contain at least one object itself that should have values for `moved` and `ringId`. Additionally you can define `description` and `url` for the entry which would be displayed as a pop-up info box when the entry is clicked in the tech radar user interface.   

The order of `rings` and `quadrants` define their position on the tech radar.


### CSV

With CSV format you can define your tech radar as a comma separated file. The order of appearance for rings and quadrants define the order they are displayed on the radar. The colors for rings in the radar are defined and can be modified using CSV format. 

An example CSV file would look like this:
```csv
title,ring,quadrant,moved,description,url
Managed Backstage,use,infrastructure,1,"Zero config approach to Backstage developer portal",https://roadie.io
React,assess,frameworks,-1,"A JavaScript library for building user interfaces",https://reactjs.org/
TypeScript,trial,languages,0,"TypeScript is JavaScript with syntax for types.",https://www.typescriptlang.org/
Scrum,hold,processes,-1,"Framework utilizing an agile mindset for developing, delivering, and sustaining products",https://www.scrum.org/
```

With this example file the tech radar will be constructed to have rings `use`, `assess`, `trial` and `hold`. Quadrants will be `infrastructure`, `frameworks`, `languages` and `processes`.


## Testing and Previewing Tech Radars

The Roadie Tech Radar implementation contains a locally hostable testing and previewing option to construct Tech Radars before publishing them to GitHub. This functionality is enabled for Administrators that have the possibility to modify 'props' values on Tech Radar pages. 

### Marking Tech Radar page as preview radar

To enable preview mode for your Tech Radar you need to identify the radar as `test-radar` in your Tech Radar page props. You can do this either by adding a new radar or editing an existing one to contain the needed props.
![Preview Radar Props configuration](./preview-radar-props.png)

This will indicate Roadie to use a local source for the content of the tech radar. 


### Expose your Tech Radar from your local environment

On preview mode the Roadie Tech Radar fetches radar data from a `localhost` hosted URL. Available URLs are limited to two options, depending which file format you would like to use for your Radar. The preview Tech Radar is using one of two files, in order of preference:
1. `radar.json`
2. `radar.csv`

Setting up a local server consist of the following steps:
1. Create a new empty folder to use as a testing ground
2. Create either one of the above files within it with the Tech Radar data you want to include in your radar
3. Start a local webserver on port `7328` to serve either one of the above files from the root path
   1. If you have Node.js and NPM installed locally, the easiest way to achieve this is to run a http-server on the folder where the files are located: `npx http-server -p 7328 --cors`
4. Navigate to your preview Tech Radar page to see results.

## More information

[Backstage Tech Radar plugin documentation](https://github.com/backstage/backstage/blob/master/plugins/tech-radar/README.md)
