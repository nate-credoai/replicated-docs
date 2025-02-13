import TeamTokenNote from "../partials/vendor-api/_team-token-note.mdx"

# Using the Replicated Registry for KOTS Installations

This topic describes how to use the Replicated private image registry for Replicated KOTS installations.
## Overview

For applications installed with KOTS, you can host private images on the Replicated registry. Hosting your images on the Replicated registry is useful if you do not already have your images in an existing private registry. It is also useful for testing purposes.

For more information about security for the Replicated registry, see [Replicated Registry Security](packaging-private-registry-security).

## Limitation

When using Docker Build to build and push images to the Replicated registry, provenance attestations are not supported. To avoid a 400 error, include the `--provenance=false` flag to disable all provenance attestations. For more information, see [docker buildx build](https://docs.docker.com/engine/reference/commandline/buildx_build/#provenance) and [Provenance Attestations](https://docs.docker.com/build/attestations/slsa-provenance/) in the Docker documentation.

## Push Images to the Replicated Registry

This procedure describes how to tag and push images to the Replicated registry. For more information about building, tagging, and pushing Docker images, see the
[Docker CLI documentation](https://docs.docker.com/engine/reference/commandline/cli/).

To push images to the Replicated registry:

1. Do one of the following to connect with the `registry.replicated.com` container registry:
   * **(Recommended) Log in with a user token**: Use `docker login registry.replicated.com` with your vendor portal email as the username and a vendor portal user token as the password. For more information, see [User API Tokens](replicated-api-tokens#user-api-tokens) in _Generating API Tokens_.
   * **Log in with a service account token:** Use `docker login registry.replicated.com` with a Replicated vendor portal service account as the password. If you have an existing team token, you can use that instead. You can use any string as the username. For more information, see [Service Accounts](replicated-api-tokens#service-accounts) in _Generating API Tokens_.
   
      <TeamTokenNote/>

   * **Log in with your credentials**: Use `docker login registry.replicated.com` with your vendor portal email and password as the credentials.

1. Tag your private image with the Replicated registry hostname in the standard
Docker format:

   ```
   docker tag IMAGE_NAME registry.replicated.com/APPLICATION_SLUG/TARGET_IMAGE_NAME:TAG
   ```

   Where:
   * `IMAGE_NAME` is the name of the existing private image for your application.
   * `APPLICATION_SLUG` is the slug assigned to your application. You can find your application slug on the **Application Settings** page in the vendor portal. For more information, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug) in _Managing Applications_.
   * `TARGET_IMAGE_NAME` is a name for the image. Replicated recommends that the `TARGET_IMAGE_NAME` is the same as the `IMAGE_NAME`.
   * `TAG` is a tag for the image.

   For example:

   ```
   docker tag worker registry.replicated.com/myapp/worker:1.0.1
   ```

1. Push your private image to the Replicated registry:

  ```
  docker push registry.replicated.com/APPLICATION_SLUG/TARGET_IMAGE_NAME:TAG
  ```