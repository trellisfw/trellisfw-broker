# OADA Configuration

## Installing OADA
```
./oada --install-self
./docker-compose build
./oada --dev up -d
```

## Edit the following files in the OADA installation
```
vim oada-core/permissions-handler/oada-srvc-permissions-handler/server.js
```

Add the following:

```
 'oada.oscs': [
    'application/vnd.oada.bookmarks.1+json',
    'application/vnd.oada.shares.1+json',
    'application/vnd.oada.osc.1+json',
    'application/vnd.oada.oscs.1+json',
    'application/json',
  ],
  'oada.pacs': [
    'application/vnd.oada.bookmarks.1+json',
    'application/vnd.oada.shares.1+json',
    'application/vnd.oada.pac.1+json',
    'application/vnd.oada.pacs.1+json',
    'application/json',
  ],
  'trellisplusplusfw': [
    'application/vnd.oada.bookmarks.1+json',
    'application/vnd.oada.shares.1+json',
    'application/vnd.oada.rocks.1+json',
    'application/vnd.oada.rock.1+json',
    'application/vnd.oada.osc.1+json',
    'application/vnd.oada.oscs.1+json',
    'application/vnd.oada.pac.1+json',
    'application/vnd.oada.pacs.1+json',
    'application/vnd.trellisfw.audit.primusgfs.1+json',
    'application/vnd.trellisfw.audit.globalgap.1+json',
    'application/vnd.trellisfw.certification.primusgfs.1+json',
    'application/vnd.trellisfw.certification.globalgap.1+json',
    'application/vnd.trellisfw.certifications.globalgap.1+json',
    'application/vnd.trellisfw.certifications.1+json',
    'application/vnd.trellisfw.client.1+json',
    'application/vnd.trellisfw.clients.1+json',
    'application/vnd.trellisfw.connection.1+json',
    'application/vnd.trellisfw.1+json',
    'application/json',
  ],

```

### Edit the Authorizations file

```
vim ./oada-srvc-docker/oada-core/libs/oada-lib-arangodb/libs/exampledocs/authorizations.js
```

Add the authorization for a new user that has *trellisplusplusfw:all* *oada.oscs:all* and *oada.pacs:all*

## Start the OADA service
```
oada --dev up -d
```

## Test OADA from Insomnia or cURL
I tested with GETs and using the token defined in the authorization file.
