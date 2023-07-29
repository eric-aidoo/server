import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import rateLimit from 'express-rate-limit';
import mysql from 'mysql2/promise';
import fileUploader from 'express-fileupload';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import expressFramework from 'express';
import nodemailer from 'nodemailer';
import cache from 'memory-cache';
import redis from 'redis';
import fetch from 'node-fetch';
import ejs from 'ejs';
import fs from 'fs';
import twilio from 'twilio';
import { IPinfoWrapper } from 'node-ipinfo';
import crypto from 'crypto';
import path from 'path';
import { promises as fsPromises } from 'fs';
import cors from 'cors';

const libraries = {
  dotenv,
  bcrypt,
  jwt,
  rateLimit,
  mysql,
  fileUploader,
  cookieParser,
  compression,
  helmet,
  expressFramework,
  nodemailer,
  cache,
  redis,
  fetch,
  ejs,
  fs,
  twilio,
  IPinfoWrapper,
  crypto,
  path,
  fsPromises,
  cors,
};

export default libraries;
