import {hc} from "hono/client"
import type {AppType} from '@/app';

const client = hc<AppType>("http://localhost:3000/");

client.auth.logout.all.$post