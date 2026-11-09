# DevOps Study Guide (step by step)

Work through the steps in order. Each has: **Learn → Do → Check → Stretch**.
Don't move on until the "Check" passes. Plan ~1 week per step at a relaxed pace.

---

## Step 1 — Command line & Git
**Learn:** What a shell is, files/paths, environment variables, commits, branches, merging.
**Do:**
```
cd devops-learning
git init
git add .
git commit -m "Initial commit"
git switch -c feature/greeting
```
Edit the message in `src/app.js`, commit, switch back to `main`, and merge.
**Check:** `git log --oneline --graph` shows your branch merged.
**Stretch:** Create a GitHub repo and push (`git remote add origin ...; git push -u origin main`).

## Step 2 — Run the app & understand what "building" means
**Learn:** What a process, port, and HTTP endpoint are. What `package.json` does.
**Do:**
```
npm test
npm start
```
Open http://localhost:3000 and http://localhost:3000/health. Try `PORT=4000` (PowerShell: `$env:PORT=4000; npm start`).
**Check:** You can explain why `/health` exists (monitoring, orchestrators).
**Stretch:** Add a new `/time` endpoint plus a test for it.

## Step 3 — Containers with Docker
**Learn:** Image vs. container, layers, Dockerfile, ports, `.dockerignore`.
**Do:**
```
docker build -t devops-learning:1.0 .
docker run -d -p 3000:3000 --name app devops-learning:1.0
docker ps
docker logs app
docker exec -it app sh
docker rm -f app
```
**Check:** The app responds from inside the container at http://localhost:3000.
**Stretch:** Read the [Dockerfile](Dockerfile); why is `USER node` there? Try `docker images` and compare sizes with `node:22` instead of `alpine`.

## Step 4 — Docker Compose (multi-container setups)
**Learn:** Declarative config, services, env vars, healthchecks.
**Do:**
```
docker compose up --build -d
docker compose ps
docker compose logs -f
docker compose down
```
**Check:** `docker compose ps` shows the service as `healthy`.
**Stretch:** Add a Redis service to `docker-compose.yml` and a `/visits` counter.

## Step 5 — CI (Continuous Integration) with GitHub Actions
**Learn:** Pipelines, triggers, jobs, runners, why automated tests gate merges.
**Do:** Push to GitHub. Open the **Actions** tab and watch [ci.yml](.github/workflows/ci.yml) run. Break a test on purpose in a branch, open a PR, and see it fail.
**Check:** A green check on `main`, a red X on the broken PR.
**Stretch:** Add a step that pushes the image to GitHub Container Registry (ghcr.io), tagged with the commit SHA.

## Step 6 — Orchestration with Kubernetes
**Learn:** Pod, Deployment, Service, replicas, probes, rolling updates.
**Do:** Enable Kubernetes in Docker Desktop (Settings → Kubernetes) or install `minikube`/`kind`.
```
docker build -t devops-learning:1.0 .
kubectl apply -f k8s/
kubectl get pods
kubectl port-forward svc/devops-learning 8080:80
```
Visit http://localhost:8080 and refresh — the `host` field changes between pods.
Then: `kubectl delete pod <name>` and watch it self-heal; `kubectl scale deploy/devops-learning --replicas=4`.
**Check:** You can explain what the readiness probe does.
**Stretch:** Build `devops-learning:2.0`, update the image in the YAML, `kubectl apply`, and watch the rolling update (`kubectl rollout status`, then `kubectl rollout undo`).

## Step 7 — Infrastructure as Code (Terraform)
**Learn:** Declarative infra, state, plan/apply, providers.
**Do:** Install Terraform. Use the `docker` provider to manage your container as code (free, local, no cloud account). Write `main.tf`, then `terraform init && terraform plan && terraform apply`, and finally `terraform destroy`.
**Check:** Changing a port in the `.tf` file and re-applying updates the container.
**Stretch:** Repeat on a cloud free tier (AWS/Azure/GCP): a VM or small cluster. Always `destroy` afterward to avoid charges.

## Step 8 — CD (Continuous Deployment)
**Learn:** Environments (staging/prod), deploy strategies (rolling, blue/green, canary), secrets.
**Do:** Extend the CI workflow so that on `main` it pushes the image and deploys (to a free host like Render/Fly.io, or your cluster). Store credentials in GitHub **Secrets**, never in code.
**Check:** Merging a PR automatically updates the running app's `version`.

## Step 9 — Monitoring & Logging
**Learn:** Metrics vs. logs vs. traces, alerts, SLIs/SLOs.
**Do:** Add Prometheus + Grafana to `docker-compose.yml`. Expose a `/metrics` endpoint (e.g., request count) and build a dashboard.
**Check:** You can see request counts rise when you refresh the page.
**Stretch:** Create an alert when `/health` fails.

## Step 10 — Security & Best Practices
**Learn:** Least privilege, secret management, image scanning, dependency updates.
**Do:** `docker scout quickview` (or Trivy) on your image; enable Dependabot; review non-root containers and resource limits.
**Check:** You can list 5 things in this repo that follow good practice.

---

## Suggested learning resources
- Linux/shell: *The Linux Command Line* (free book)
- Docker: official "Get Started" tutorial
- Kubernetes: kubernetes.io "Learn Kubernetes Basics"
- Terraform: HashiCorp Developer tutorials
- Practice: roadmap.sh/devops for the big picture

## Tracking progress
- [ ] 1 Git
- [ ] 2 Run app
- [ ] 3 Docker
- [ ] 4 Compose
- [ ] 5 CI
- [ ] 6 Kubernetes
- [ ] 7 Terraform
- [ ] 8 CD
- [ ] 9 Monitoring
- [ ] 10 Security
